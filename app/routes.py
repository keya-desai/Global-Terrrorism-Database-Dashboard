from flask import render_template
from app import app
from app.models import DataBase
from app import session
from app import connection
import pandas as pd
import json
import plotly
import plotly.graph_objs as go
import numpy as np
import pdb

@app.route('/')
# @app.route('/layout')
# def layout():
#     return render_template('layout_side_nav.html', title = 'Global Terrorism Analysis')

@app.route('/home')
def home():
    return render_template('home.html', title = 'Global Terrorism Analysis')


@app.route('/worldmap')
def worldmap():
    return render_template('map_slider.html', title = 'World map')
    # return render_template('worldmap.html', title='World map')

@app.route('/get_csv_data')
def get_csv_data():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name from main group by country_txt", connection)
    # df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name from main where iyear = '1970' group by country_txt  ", connection)
    return df.to_csv(index = False)

@app.route('/get_csv_data_slider')
def get_csv_data_slider():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name, iyear as iyear from main group by country_txt, iyear", connection)
    df.loc[(df.name == 'United States'), 'name'] = 'USA'
    # print(df.name.unique)
    return df.to_csv(index = False)

@app.route('/index')
def index():

    # SQLALCHEMY
    # me = User(username='susan', email='susan@example.com')
    # db.session.add(me)
    # newuser = User(username='admin',
    #                email='admin@example.com')
    # session.add(newuser)

    # session.query(DataBase).filter(DataBase.iyear == '1970')
    # # res = connection.execute("Select * from main")

    # df = pd.read_sql('SELECT * FROM main', connection)
    # print(df)

    # Sample
    # bar = create_plot()

    line = create_plot_attack_per_year(connection)
    pie = create_plot_pie(connection)
    return render_template('index.html', title='Global Terrorism Analysis', plot1 = pie, plot2 = line)

def create_plot():

    N = 40
    x = np.linspace(0, 1, N)
    y = np.random.randn(N)
    df = pd.DataFrame({'x': x, 'y': y}) # creating a sample dataframe


    data = [
        go.Bar(
            x=df['x'], # assign x as the dataframe column 'x'
            y=df['y']
        )
    ]

    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON

def create_plot_attack_per_year(connection):

    df = pd.read_sql("Select eventid, country_txt, iyear from main where country_txt in ('United States','India')",
                     connection)
    df_new = df.groupby(['country_txt', 'iyear'], as_index=False).count().rename(columns={"eventid":"Occurence"})
    df_india = df_new.query("country_txt == 'India' ")
    df_usa = df_new.query("country_txt == 'United States' ")

    trace0 = go.Scatter(x = df_india['iyear'],
                        y = df_india['Occurence'],
                        mode = 'lines',
                        text = df_india['country_txt'],
                        name = "India",
                        # title='Number of attacks per each year'
                        )
                        # line_color = df_india['country_txt'])
    trace1 = go.Scatter(x = df_usa['iyear'],
                        y = df_usa['Occurence'],
                        mode = 'lines',
                        text=df_usa['country_txt'],
                        name = "Unites States",
                        # title='Number of attacks per each year'
                        # line_color=df_usa['country_txt']
                        )
    data = [trace0,trace1]

    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON


def create_plot_pie(connection):
    df_pie = pd.read_sql("select eventid, attacktype1_txt from main where success = '1'", connection)   
    df_new = df_pie.groupby(['attacktype1_txt'], as_index=False).count().rename(columns={"eventid": "Occurence"})
    data = [
        go.Pie(
            values = df_new['Occurence'],
            labels = df_new['attacktype1_txt']
        )
    ]

    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON