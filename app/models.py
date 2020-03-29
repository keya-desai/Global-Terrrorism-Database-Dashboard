# from app import db
# from sqlalchemy.dialects.postgresql import JSON

# class Result(db.Model):
#     __tablename__ = 'main'
#
#     rows = db.Model.query("Select * from main")
#
#     def __init__(self, rows):
#         self.data = rows
#
#     def __repr__(self):
#         return '<id {}>'.format(self.data)


# id = db.Column(db.Integer, primary_key=True)
# url = db.Column(db.String())
# result_all = db.Column(JSON)
# result_no_stop_words = db.Column(JSON)

# def __init__(self, url, result_all, result_no_stop_words):
#     self.url = url
#     self.result_all = result_all
#     self.result_no_stop_words = result_no_stop_words
#
# def __repr__(self):
#     return '<id {}>'.format(self.id)


# from app import db
# import psycopg2
# import psycopg2.extras
#
# class Test():
#     cursor = db.cursor(cursor_factory=psycopg2.extras.DictCursor)
#
#     def Query(self):
#         cursor.execute("""Select * from main where country_txt = 'Mexico' """)
#         return 'Query executed'
#     #
#     # def __repr__(self):
# #     #     return "Query executed!"
#
# from app import db
#
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(64), index=True, unique=True)
#     email = db.Column(db.String(120), index=True, unique=True)
#     password_hash = db.Column(db.String(128))
#
#     def __repr__(self):
#         return '<User {}>'.format(self.username)


from sqlalchemy import Column, Table
from sqlalchemy.types import Integer, Text, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import event
from app import engine
from app import db


Base = declarative_base()


# class User(db.Model):
#     id = Column(Integer,
#                 primary_key=True)
#     username = Column(String(80),
#                       unique=True, nullable=False)
#     email = Column(String(120),
#                    unique=True,
#                    nullable=False)
#     # joined = Column(Datetime,
#     #                 unique=False,
#     #                 nullable=False)
#
#     def __repr__(self):
#         return '<User %r>' % self.username



@event.listens_for(Table, "column_reflect")
def column_reflect(inspector, table, column_info):
    # set column.key = "attr_<lower_case_name>"
    if table.metadata is Base.metadata:
        column_info['key'] = "attr_%s" % column_info['name'].lower()


class DataBase(Base):
    __table__ = Table("main", Base.metadata,
                      autoload=True, autoload_with=engine)

