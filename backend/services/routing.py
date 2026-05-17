DEPARTMENT_MAP = {
    "Pothole / Road Damage": "Municipal Corporation / PWD",
    "Garbage Accumulation": "Sanitation Department",
    "Water Leakage": "Water Department",
    "Damaged Electric Wire": "Electricity Board",
    "Fire / Smoke": "Fire Brigade",
    "Illegal Parking": "Traffic Police",
    "Dead Animal": "Animal Control / Sanitation Department",
    "Fallen Tree / Road Blockage": "Municipal Corporation",
    "General Civic Issue": "Municipal Corporation",
}


def route_to_department(category: str) -> str:
    return DEPARTMENT_MAP.get(category, "Municipal Corporation")
