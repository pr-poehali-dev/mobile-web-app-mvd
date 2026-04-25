import json
import os
import hashlib
import psycopg2
from datetime import datetime, timezone

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def handler(event: dict, context) -> dict:
    """Авторизация сотрудника по табельному номеру и паролю."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    tab_number = (body.get("tab_number") or "").strip().upper()
    password = body.get("password") or ""

    if not tab_number or not password:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Укажите табельный номер и пароль"})}

    password_hash = hashlib.md5(password.encode()).hexdigest()

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        "SELECT id, full_name, rank, department, uid, access_level "
        "FROM t_p25741584_mobile_web_app_mvd.officers "
        "WHERE tab_number = '" + tab_number.replace("'", "''") + "' AND password_hash = '" + password_hash + "'"
    )
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный табельный номер или пароль"})}

    officer_id, full_name, rank, department, uid, access_level = row

    cur.execute(
        "UPDATE t_p25741584_mobile_web_app_mvd.officers SET last_login = NOW() WHERE id = " + str(officer_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": CORS,
        "body": json.dumps({
            "ok": True,
            "officer": {
                "uid": uid,
                "full_name": full_name,
                "rank": rank,
                "department": department,
                "tab_number": tab_number,
                "access_level": access_level,
            },
        }),
    }
