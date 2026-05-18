DEPARTMENT_MAP = {
    "Pothole / Road Damage": "Public Works Department (PWD) / Nagar Nigam",
    "Garbage Accumulation": "Municipal Solid Waste Management Department (Nagar Palika)",
    "Water Leakage / Sewage Overflow": "Jal Board / Urban Local Body Water Supply Department",
    "Damaged Electric Wire / Power Outage": "State Electricity Distribution Company (DISCOM)",
    "Fire / Smoke": "State Fire and Emergency Services Department",
    "Illegal Parking / Traffic Obstruction": "Traffic Police / City Traffic Management Cell",
    "Dead Animal on Road": "Animal Husbandry Department / Nagar Nigam Sanitation Wing",
    "Fallen Tree / Road Blockage": "Urban Forestry Department / Nagar Nigam",
    "Broken Street Light": "Municipal Street Lighting Department / DISCOM",
    "Open Drain / Manhole": "Urban Local Body (ULB) Drainage Department",
    "General Civic Issue": "Nagar Nigam / Urban Local Body (ULB)",
}


def route_to_department(category: str) -> str:
    return DEPARTMENT_MAP.get(category, "Nagar Nigam / Urban Local Body (ULB)")
