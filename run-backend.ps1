Set-Location -Path "$PSScriptRoot\backend"
python -m uvicorn main:app --reload --port 8000
