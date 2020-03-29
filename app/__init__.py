from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
# import psycopg2
# import psycopg2.extras

# from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
# migrate = Migrate(app, db)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine('postgresql://postgres:password@localhost:5432/gtd', echo=True)
connection = engine.connect()
Session = sessionmaker(bind=engine)
session = Session()

# connection = psycopg2.connect(user = "postgres",
#                                   password = "password",
#                                   host = "localhost",
#                                   port = "5432",
#                                   dbname = "gtd")
# cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
# def connectdb():
# 	cursor.execute("""Select * from main where country_txt = 'Mexico' """)
# 	return "Query executed!"
#
# db = psycopg2.connect(user="postgres",
#                                       password="password",
#                                       host="localhost",
#                                       port="5432",
#                                       dbname="gtd")


from app import routes, models