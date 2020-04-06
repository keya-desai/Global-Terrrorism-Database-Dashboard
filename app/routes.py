from flask import render_template, after_this_request, Response
from app import app
# from app.models import DataBase
# from app import session
from app import connection
import pandas as pd
from app import plotsAnalysis

@app.route('/')
# def layout():
#     return render_template('layout_side_nav.html', title = 'Global Terrorism Analysis')

@app.route('/home')
def home():
    return render_template('home.html', title = 'Global Terrorism Analysis')



@app.route('/worldmap')
def worldmap():
    return render_template('global.html')
    # return render_template('worldmap.html', title='World map')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/region')
def region():

    plots = plotsAnalysis.Plots()
    # line = create_plot_attack_per_year(connection)
    attack_pie = plots.create_attack_pie()
    target_pie = plots.create_target_pie()
    weapon_pie = plots.create_weapon_pie()
    region_line = plots.attack_per_region()
    reg_map = plots.region_map()
    reg_target = plots.region_target()
    reg_weapon = plots.region_weapon()
    reg_attack = plots.region_attack()

    return render_template('region.html', title='Global Terrorism Analysis', plot1 = attack_pie, plot2 = target_pie, plot3 = weapon_pie, region_line = region_line, plot5 = reg_map, reg_target = reg_target, reg_weapon = reg_weapon, reg_attack = reg_attack)


@app.route('/country')
def country():
    return render_template('country.html')





@app.route('/get_csv_data')
def get_csv_data():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name from main group by country_txt", connection)
    # df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name from main where iyear = '1970' group by country_txt  ", connection)
    return df.to_csv(index = False)

@app.route('/get_csv_data_slider')
def get_csv_data_slider():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name, iyear as iyear from main group by country_txt, iyear", connection)
    df.loc[(df.name == 'United States'), 'name'] = 'USA'
    return df.to_csv(index = False)

# @app.route('/get_csv_data_dropdown')

@app.route('/get_csv_data_dropdown', methods=['GET'])
def get_csv_data_dropdown():
    df = pd.read_sql("select sum(case when nkill = '' then 0 else cast(nkill as int)  end) as num_deaths, count(country_txt) as num_attacks, \
        country_txt as name, iyear as iyear  from main group by country_txt, iyear", connection)
    df.loc[(df.name == 'United States'), 'name'] = 'USA'
    # return Response(df.to_csv(index = False), mimetype='text/csv')
    return df.to_csv(index = False)




@app.route('/get_csv_bar_race')
def get_csv_bar_race():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name, iyear as iyear, imonth as imonth  from main where success = '1'group by country_txt, iyear, imonth", connection)
    df['date'] = df.apply(lambda row: cal_date(row), axis=1)
    # df = df.groupby(['name','date'],as_index=False).agg({"success": "sum"})
    df.loc[(df.name == 'United States'), 'name'] = 'USA'
    print(df)
    return df.to_csv(index = False)

def cal_date(row):
  month = str(row['imonth'])
  if len(month) == 1:
    month ="0" + month
  date = str(row['iyear']) + "-" + month + "-" + "01"
  return date


@app.route('/get_csv_data_scatter')
def get_csv_data_scatter():
    asia_country_list = ["India", "Afghanistan", "Nepal", "China", "North Korea"]
    df = pd.read_sql("select longitude as long, latitude as lat, iyear as iyear, \
                        (case when nkill = '' then 0 else cast(nkill as int)  end) as kills, country_txt from main\
                        where region_txt = 'South Asia'", connection)
    # df.loc[(df.name == 'United States'), 'name'] = 'USA'
    # print(df)
    return df.to_csv(index = False)
    





# setting up sql alchemy

# SQLALCHEMY
# me = User(username='susan', email='susan@example.com')
# db.session.add(me)
# newuser = User(username='admin',
#                email='admin@example.com')
# session.add(newuser)

# session.query(DataBase).filter(DataBase.iyear == '1970')
# # res = connection.execute("Select * from main")
