from flask import render_template, current_app
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

@app.route('/trends')
def trends():
    return render_template('trends_1.html')

@app.route('/country_final')
def country_final():
    return render_template('country_final.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/region')
def region():

    plots = plotsAnalysis.Plots()
    # line = create_plot_attack_per_year(connection)
    # attack_pie = plots.create_attack_pie()
    # target_pie = plots.create_target_pie()
    # weapon_pie = plots.create_weapon_pie()
    # region_line = plots.attack_per_region()
    # reg_map = plots.region_map()
    # reg_target = plots.region_target()
    # reg_weapon = plots.region_weapon()
    reg_attack = plots.region_attack()

    return render_template('region.html', reg_attack = reg_attack)


@app.route('/country')
def country():
    return render_template('country.html')

@app.route('/get_data_world')
def get_data_world():
    df = pd.read_sql("select iyear, count(eventid) as attacks, \
                    sum(case when nkill = '' then 0 else cast(nkill as int)  end) as deaths\
                    from main\
                    where success = '1'\
                    group by iyear", connection)
    
    return df.to_csv(index = False)



@app.route('/get_data_top_cities/<country>', methods=['GET'])
def get_data_top_cities(country):
    df = pd.read_sql("select count(eventid) as num_attacks, \
                        sum(case when nkill = '' then 0 else cast(nkill as int)  end) as kills, city\
                        from main\
                        where country_txt = '" + country +"' \
                        group by city\
                        order by num_attacks desc\
                        limit 10", connection)
    # df.loc[(df.name == 'United States'), 'name'] = 'USA'
    # return Response(df.to_csv(index = False), mimetype='text/csv')
    return df.to_json(orient = 'records')

@app.route('/get_data_country_year_att_kills')
def get_data_country_year_att_kills():
    df = pd.read_sql("select count(eventid) as attacks, \
                        sum(case when nkill = '' then 0 else cast(nkill as int)  end) as kills, \
                        country_txt, iyear \
                        from main \
                        where success = '1' \
                        group by country_txt, iyear \
                        ", connection)
    df.loc[(df.country_txt == 'United States'), 'country_txt'] = 'USA'
    # df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name from main where iyear = '1970' group by country_txt  ", connection)
    return df.to_csv(index = False)

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
        country_txt as name, iyear as iyear  from main \
        where success = '1' \
        group by country_txt, iyear", connection)
    df.loc[(df.name == 'United States'), 'name'] = 'USA'
    # return Response(df.to_csv(index = False), mimetype='text/csv')
    return df.to_csv(index = False)




# @app.route('/get_csv_bar_race')
# def get_csv_bar_race():
#     df = pd.read_sql("select count(country_txt) as num_attacks, country_txt as name, iyear as iyear, imonth as imonth  from main where success = '1'group by country_txt, iyear, imonth", connection)
#     df['date'] = df.apply(lambda row: cal_date(row), axis=1)
#     # df = df.groupby(['name','date'],as_index=False).agg({"success": "sum"})
#     df.loc[(df.name == 'United States'), 'name'] = 'USA'
#     print(df)
#     return df.to_csv(index = False)


@app.route('/get_json_bar_race')
def get_json_bar_race():
    df = pd.read_sql("select count(country_txt) as num_attacks, country_txt, iyear as iyear  from main where success = '1' group by country_txt, iyear", connection)
    
    # print(df[(df['iyear'] == "2017")])
    # print(df[(df['iyear'] == "2017") & (df['country_txt'] == country)])

    data = {}
    country_list = df['country_txt'].unique()
    
    for year in range(1970,2018):
      temp = []
      year = str(year)
      temp_df = df[(df['iyear'] == year)]
      # print(temp_df)

      for country in country_list:
        temp_dict = {}
        temp_dict["country"] = str(country)
        # temp_df = df[(df['iyear'] == year) & (df['country_txt'] == country)]
        # temp_df.head()
        temp_country_df = temp_df[(temp_df['country_txt'] == country)]
        # print(temp_country_df)
        if not temp_country_df.empty:
          # print(temp_df['success'])
          temp_dict["value"] = int(temp_country_df['num_attacks'])
        else:
          temp_dict["value"] = 0
        temp.append(temp_dict)
      data[year] = temp

    # print("In json bar race routes.py")
    # print(data["1970"])
    print(data)
    return data


def cal_date(row):
  month = str(row['imonth'])
  if len(month) == 1:
    month ="0" + month
  date = str(row['iyear']) + "-" + month + "-" + "01"
  return date



@app.route('/get_csv_data_scatter/<int:year>')
def get_csv_data_scatter(year):
    df = pd.read_sql("select country_txt, longitude as long, latitude as lat, provstate, city, location, summary, attacktype1_txt, targtype1_txt, weaptype1_txt, motive, gname, iyear, \
                    (case when nkill = '' then 0 else cast(nkill as int)  end) as kills,\
                    (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds \
                    from main\
                    where success = '1' and iyear = '" + str(year) + "' and longitude != '' ", connection )
    
    # print("data read")
    # print(df)
    # print(year)
    # where region_txt in ('South Asia', 'Central Asia', 'Southeast Asia', 'East Asia') \

    return df.to_csv(index = False)

@app.route('/get_csv_world_scatter/<int:year>')
def get_csv_world_scatter(year):
    df = pd.read_sql("select country_txt, longitude as long, latitude as lat, provstate, city, location, summary, attacktype1_txt, targtype1_txt, weaptype1_txt, motive, gname, iyear, \
                    (case when nkill = '' then 0 else cast(nkill as int)  end) as kills,\
                    (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds \
                    from main\
                    and success = '1' and iyear = '" + str(year) + "'and longitude != '' ", connection )
    
    # print("data read")
    # print(df)
    # print(year)

    return df.to_csv(index = False)


    
@app.route('/get_csv_data_terrorist/')
def get_csv_data_terrorist():


    df = pd.read_sql("select count(eventid) as num_attacks, gname, iyear\
                    from main\
                    where country_txt = 'United States' and success = '1'\
                    group by  gname, iyear;", connection)
    # df_3 = gt_data[(gt_data['country_txt'] == "United States")]
    # gname_df = df_3.groupby(['iyear','gname'],as_index=False).agg({"success": "sum"})



    gname_list = df['gname'].unique()

    data = []
    for name in gname_list:
      n_df = df[df['gname'] == name]
      for y in range(1970,2018):
        y = str(y)
        y_df = n_df[n_df['iyear'] == y]
        val = 0
        if not y_df.empty:
          val = int(y_df['num_attacks'])
        temp_dict = {"gname":name,"year":y,"attacks":val}
        data.append(temp_dict)
    # print(data)

    # return data.to_csv(index = False)

@app.route('/get_csv_data_lineplot/<country>')
def get_csv_data_lineplot(country):

    df = pd.read_sql("select iyear , country_txt,\
                        count(eventid) as attacks,\
                        sum(case when nkill = '' then 0 else cast(nkill as int)  end) as kills,\
                        sum(case when nwound = '' then 0 when nwound = '8.5' then 8 else cast(nwound as int)  end) as wounds \
                        from main\
                        where country_txt = '" + country +"' \
                        group by iyear, country_txt\
                        order by iyear ", connection)
    # print(country)

    return df.to_csv(index = False)


@app.route('/get_csv_attack_donutchart/<country>')
def get_csv_attack_donutchart(country):

    df = pd.read_sql("select count(eventid), attacktype1_txt,  country_txt\
                        from main \
                        where country_txt = '" + country +"' \
                        group by attacktype1_txt,  country_txt", connection)
                            # print(country)
    print("Attack")
    print(df)
    return df.to_csv(index = False)

@app.route('/get_csv_target_donutchart/<country>')
def get_csv_target_donutchart(country):

    df = pd.read_sql("select count(eventid), targtype1_txt,  country_txt\
                        from main \
                        where country_txt = '" + country +"' \
                        group by targtype1_txt,  country_txt", connection)
                            # print(country)
    print("Target")
    print(df)
    return df.to_csv(index = False)

@app.route('/get_csv_weapon_donutchart/<country>')
def get_csv_weapon_donutchart(country):

    df = pd.read_sql("select count(eventid), weaptype1_txt,  country_txt\
                        from main \
                        where country_txt = '" + country +"' \
                        group by weaptype1_txt,  country_txt", connection)
                            # print(country)

    print("Weapon")
    print(df)
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
