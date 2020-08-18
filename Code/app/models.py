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

