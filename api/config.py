from dotenv import load_dotenv
from os import getenv
from pathlib import Path

from pydantic import BaseModel

class Config(BaseModel):
    SECRET_KEY: str
    ALGORITHM: str


dotevn_path = Path(".env")
load_dotenv(dotenv_path=dotevn_path)

CONFIG = Config(
    SECRET_KEY=str(getenv("SECRET_KEY")),
    ALGORITHM=str(getenv("ALGORITHM")),
)


def main():
    print(CONFIG)


if __name__ == "__main__":
    main()