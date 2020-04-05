from flask import render_template
from app import app
from app import connection
import numpy as np
import pandas as pd
import json
import plotly
import plotly.graph_objs as go



class Plots:

	def __init__(self):

		self.region = {12: "Australasia & Oceania", 11:"Sub-Saharan Africa", 10:"Middle East & North Africa", 9:"Eastern Europe",
	          8:"Western Europe", 7:"Central Asia", 6:"South Asia", 5:"Southeast Asia", 4:"East Asia", 3:"South America",
	          2:"Central America & Caribbean", 1:"North America"}

		self.scope = {12: "world", 11:"africa", 10:"africa", 9:"europe",
		          8:"europe", 7:"asia", 6:"asia", 5:"asia", 4:"asia", 3:"south america",
		          2:"north america", 1:"north america"}

	def create_attack_pie(self):
	    df_pie = pd.read_sql("select eventid, attacktype1_txt from main where success = '1'", connection)   
	    df_new = df_pie.groupby(['attacktype1_txt'], as_index=False).count().rename(columns={"eventid": "Occurence"})
	    data = [
	        go.Pie(
	            values = df_new['Occurence'],
	            labels = df_new['attacktype1_txt'],
	            hole = 0.4,
	            # annotations=[dict(text='Attack type', font_size=15, showarrow=False)]
	            )
	    ]

	    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
	    return graphJSON


	def create_target_pie(self):
	    df_pie = pd.read_sql("select eventid, targtype1_txt from main where success = '1'", connection)   
	    df_new = df_pie.groupby(['targtype1_txt'], as_index=False).count().rename(columns={"eventid": "Occurence"})
	    data = [
	        go.Pie(
	            values = df_new['Occurence'],
	            labels = df_new['targtype1_txt'],
	            hole = 0.4,
	            # annotations=[dict(text='Target type', font_size=15, showarrow=False)]
	            )  
	    ]

	    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
	    return graphJSON

	def create_weapon_pie(self):
	    df_pie = pd.read_sql("select eventid, weaptype1_txt from main where success = '1'", connection)   
	    df_new = df_pie.groupby(['weaptype1_txt'], as_index=False).count().rename(columns={"eventid": "Occurence"})
	    df_new.loc[(df_new.weaptype1_txt == 'Vehicle (not to include vehicle-borne explosives, i.e., car or truck bombs)'), 'weaptype1_txt'] = 'Vehicle'
	    data = [
	        go.Pie(
	            values = df_new['Occurence'],
	            labels = df_new['weaptype1_txt'],
	            hole = 0.4,
	            # annotations=[dict(text='Weapon type', font_size=15, showarrow=False)]
	            )
	        
	    ]

	    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
	    return graphJSON

	


	def attack_per_region(self):
	    # fig = go.Figure()
	    data = []
	    df_pie = pd.read_sql("select eventid, iyear as year, region_txt from main where success = '1'", connection)   
	    # df_new = df_pie.groupby(['iyear','region_txt'], as_index=False).count().rename(columns={"eventid": "Occurence", "iyear":"year"})
	    df_new = df_pie
	    print(df_new)
	    # max_per_yr_region = 0
	    years = np.arange(1970, 2017)
	    for rgn in self.region:
	        per_region = np.asarray(df_new[(df_new.region_txt == self.region[rgn])].groupby('year').year.count())
	        print(per_region)
	        # if max(per_region) > max_per_yr_region:
	        #     max_per_yr_region = max(per_region)
	        t = go.Scatter(
	                x = years,
	                y = per_region,
	                mode = 'lines',
	                name = self.region[rgn],
	                )
	        data.append(t)

	    graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
	    return graphJSON

	def region_map(self):

	    data_region = pd.read_sql("select eventid as id, iyear as year, iday as day, imonth as month,region_txt as region, country_txt as country, provstate as state, latitude, longitude, targtype1_txt as target, attacktype1_txt as attack,(case when nkill = '' then 0 else cast(nkill as int)  end) as kills, (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds from main where region_txt = 'North America'", connection)

	    # if not data_region['day']:
	    #     data_region['day'] = 1
	    # if not data_region['month']:
	    #     data_region['month'] = 1
	    data_region['day'][data_region.day == '0'] = 1

	    data_region['month'][data_region.month == '0'] = 1
	    data_region['date'] = pd.to_datetime(data_region[['day', 'month', 'year']])

	    # data_region = data_region[['id', 'date', 'year', 'region', 'country',
	    #                         'state', 'latitude', 'longitude', 'attack',
	    #                         'target', 'nationality', 'group', 'weapon',
	    #                         'kills', 'wounds']]
	    data_region = data_region.sort_values(['kills', 'wounds'], ascending = False)
	    data_region = data_region.drop_duplicates(['date', 'latitude', 'longitude', 'kills'])
	    data_region['text'] = data_region['date'].dt.strftime('%B %-d, %Y') + '<br>' +\
	                        data_region['kills'].astype(str) + ' Killed, ' +\
	                        data_region['wounds'].astype(str) + ' Wounded'

	    world_map = []


	    w1 = go.Scattergeo(
	        type = 'scattergeo',
	        locationmode = 'USA-states',
	        lon = data_region[data_region.kills > 0]['longitude'],
	        lat = data_region[data_region.kills > 0]['latitude'],
	        text = data_region[data_region.kills > 0]['text'],
	        mode = 'markers',
	        name = 'kills',
	        hoverinfo = 'text+name',
	        marker = dict(
	            size = data_region[data_region.kills > 0]['kills'] ** 0.25 * 8,
	            opacity = 0.95,
	            color = 'rgb(240, 45, 48)')
	        )

	    world_map.append(w1)

	    w2 = go.Scattergeo(
	            type = 'scattergeo',
	            locationmode = 'USA-states',
	            lon = data_region[data_region.kills == 0]['longitude'],
	            lat = data_region[data_region.kills == 0]['latitude'],
	            text = data_region[data_region.kills == 0]['text'],
	            mode = 'markers',
	            name = 'wounds',
	            hoverinfo = 'text+name',
	            marker = dict(
	                size = (data_region[data_region.kills == 0]['wounds'] + 1) ** 0.25 * 8,
	                opacity = 1,
	                color = 'rgb(45, 146, 240)')
	            )
	    world_map.append(w2)

	        # world_map.update_layout(
	        #     title = 'Terrorist Attacks in ' + target_region + ' (1970-2017)',
	        #     showlegend = True,
	        #     legend = dict(
	        #         x = 0.5, y = 0.5
	        #         ),
	        #     geo = dict(
	        #         scope = target_scope,
	        #         showland = True,
	        #         landcolor = 'rgb(255, 228, 196)',
	        #         showlakes = True,
	        #         lakecolor = 'rgb(240, 255, 255)'
	        #         )
	        # )
	    graphJSON = json.dumps(world_map, cls=plotly.utils.PlotlyJSONEncoder)
	    return graphJSON

	def region_target(self):
	        target_region = self.region[1] # North America
	        target_scope = self.scope[1]
	        
	        data_region = pd.read_sql("select eventid, targtype1_txt as target, (case when nkill = '' then 0 else cast(nkill as int)  end) as kills, (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds from main where region_txt = 'North America'", connection)
	        # data_region = data[(data.region == target_region)]

	        target_codes = []
	        for tar_type in data_region['target'].values:
	            if tar_type in ['Business', 'Journalists & Media', 'NGO']:
	                target_codes.append(1)
	            elif tar_type in ['Government (General)', 'Government (Diplomatic)']:
	                target_codes.append(2)
	            elif tar_type in ['Private Citizens & Property', 'Tourists']:
	                target_codes.append(3)
	            elif tar_type == 'Abortion Related':
	                target_codes.append(4)
	            elif tar_type == 'Educational Institution':
	                target_codes.append(5)
	            elif tar_type == 'Police':
	                target_codes.append(6)
	            elif tar_type in ['Military', 'Terrorists/Non-State Militia']:
	                target_codes.append(7)
	            elif tar_type == 'Religious Figures/Institutions':
	                target_codes.append(8)
	            elif tar_type in ['Airports & Aircraft', 'Maritime', 'Transportation']:
	                target_codes.append(9)
	            elif tar_type in ['Food or Water Supply', 'Telecommunication', 'Utilities']:
	                target_codes.append(10)
	            elif tar_type in ['Violent Political Party']:
	                target_codes.append(11)
	            elif tar_type in ['Other', 'Unknown']:
	                target_codes.append(12)

	        data_region['target'] = target_codes

	        target_categories = ['Business', 'Government', 'Private/Individuals', 'Abortion', 'Education',
	                            'Police', 'Military/Militia', 'Religion', 'Transportation', 'Infrastructure',
	                            'Political Party', 'Other/Unknown'
	        ]

	        # terrorist attacks by target
	        target_count = np.asarray(data_region.groupby('target').target.count())
	        target_percent = np.round(target_count / sum(target_count) * 100, 2)

	        # terrorist attack fatalities by target
	        target_kills = np.asarray(data_region.groupby('target')['kills'].sum())
	        for i in range(len(target_kills)):
	            if target_kills[i] == 0:
	                target_kills[i] = 1
	        target_yaxis = np.log10(target_kills)

	        # terrorist attack injuries by target
	        target_wounds = np.asarray(data_region.groupby('target')['wounds'].sum())
	        for i in range(len(target_wounds)):
	            if target_wounds[i] == 0:
	                target_wounds[i] = 1
	        target_xaxis = np.log10(target_wounds)

	        target_text = []
	        for i in range(12):
	            target_text.append(target_categories[i] + ' (' + target_percent[i].astype(str) 
	                            + '%)<br>' + target_kills[i].astype(str) + ' Killed, '
	                            + target_wounds[i].astype(str) + ' Wounded')

	        # TargetByRegion = go.Figure()

	        TargetByRegion = []

	        t = go.Scatter(
	                x = target_wounds,
	                y = target_kills,
	                text = target_text,
	                mode = 'markers',
	                hoverinfo = 'text',
	                marker = dict(
	                    size = target_count/5,
	                    opacity = 0.8,
	                    color = 'rgb(45, 146, 240)')
	                )
	        TargetByRegion.append(t)

	        target_annotations = []
	        for i in range(12):
	            target_annotations.append(dict(x=target_xaxis[i], y=target_yaxis[i],
	                                    xanchor='center', yanchor='top',
	                                    text=target_categories[i], showarrow=True))
	        
	        # TargetByRegion.update_layout(
	        #         title = 'Target Type Distribution in ' + target_region + ' (1970-2017)',
	        #         annotations = target_annotations,
	        #         xaxis = dict(
	        #             title = 'Wounds',
	        #             type = 'log',
	        #             tickmode = 'auto',
	        #             nticks = 4,
	        #             showline = True
	        #         ),
	        #         yaxis = dict(
	        #             title = 'Kills',
	        #             type = 'log',
	        #             tickmode = 'auto',
	        #             nticks = 4,
	        #             showline = True),
	        #         )
	        # print(data)
	        d = {"data":TargetByRegion,"annot" :target_annotations}
	        graphJSON = json.dumps(d, cls=plotly.utils.PlotlyJSONEncoder)
	        return graphJSON


	def region_weapon(self):

	        data_region = pd.read_sql("select eventid, weaptype1_txt as weapon, \
	            (case when nkill = '' then 0 else cast(nkill as int)  end) as kills, \
	            (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds \
	            from main where region_txt = 'North America'", connection)


	        weapon_codes = []
	        for weap_type in data_region['weapon'].values:
	            if weap_type == 'Biological':
	                weapon_codes.append(1)
	            elif weap_type in ['Chemical', 'Radiological']:
	                weapon_codes.append(2)
	            elif weap_type in ['Firearms', 'Fake Weapons']:
	                weapon_codes.append(3)
	            elif weap_type in ['Explosives', 'Sabotage Equipment']:
	                weapon_codes.append(4)
	            elif weap_type == 'Incendiary':
	                weapon_codes.append(5)
	            elif weap_type == 'Melee':
	                weapon_codes.append(6)
	            elif 'Vehicle' in weap_type:
	                weapon_codes.append(7)
	            elif weap_type in ['Unknown', 'Other']:
	                weapon_codes.append(8)

	        data_region['weapon'] = weapon_codes
	        weapon_categories = ['Biological', 'Chemicals', 'Firearms', 'Explosives',
	                            'Incendiary', 'Melee', 'Vehicles', 'Other/Unknown']

	        # terrorist attacks by weapon
	        weapon_count = np.asarray(data_region.groupby('weapon').weapon.count())
	        weapon_percent = np.round(weapon_count / sum(weapon_count) * 100, 2)

	        # terrorist attack fatalities by weapon
	        weapon_kills = np.asarray(data_region.groupby('weapon')['kills'].sum())
	        for i in range(len(weapon_kills)):
	            if weapon_kills[i] == 0:
	                weapon_kills[i] = 1
	        weapon_yaxis = np.log10(weapon_kills)

	        # terrorist attack injuries by weapon
	        weapon_wounds = np.asarray(data_region.groupby('weapon')['wounds'].sum())
	        for i in range(len(weapon_wounds)):
	            if weapon_wounds[i] == 0:
	                weapon_wounds[i] = 1
	        weapon_xaxis = np.log10(weapon_wounds)

	        weapon_text = []
	        for i in range(8):
	            weapon_text.append(weapon_categories[i] + ' (' + weapon_percent[i].astype(str) 
	                            + '%)<br>' + weapon_kills[i].astype(str) + ' Killed, '
	                            + weapon_wounds[i].astype(str) + ' Wounded')
	            
	        WeaponByRegion = []

	        w = go.Scatter(
	                x = weapon_wounds,
	                y = weapon_kills,
	                text = weapon_text,
	                mode = 'markers',
	                hoverinfo = 'text',
	                marker = dict(
	                    size = weapon_count/7,
	                    opacity = 0.9,
	                    color = 'rgb(45, 146, 240)')
	                )
	        WeaponByRegion.append(w)

	        weapon_annotations = []
	        for i in range(8):
	            weapon_annotations.append(dict(x=weapon_xaxis[i], y=weapon_yaxis[i],
	                                    xanchor='center', yanchor='top',
	                                    text=weapon_categories[i], showarrow=True))

	        graphJSON = json.dumps({"data":WeaponByRegion, "annot":weapon_annotations}, cls=plotly.utils.PlotlyJSONEncoder)
	        return graphJSON

	def region_attack(self):
	        data_region = pd.read_sql("select eventid, attacktype1_txt as attack, \
	                    (case when nkill = '' then 0 else cast(nkill as int)  end) as kills, \
	                    (case when nwound = '' then 0 else cast(nwound as int)  end) as wounds \
	                    from main where region_txt = 'North America'", connection) 
	                            
	        attack_codes = []
	        for attk_type in data_region['attack'].values:
	            if attk_type in ['Armed Assault', 'Unarmed Assault']:
	                attack_codes.append(1)
	            elif attk_type == 'Assassination':
	                attack_codes.append(2)
	            elif attk_type == 'Bombing/Explosion':
	                attack_codes.append(3)
	            elif attk_type == 'Facility/Infrastructure Attack':
	                attack_codes.append(4)
	            elif attk_type == 'Hijacking':
	                attack_codes.append(5)
	            elif attk_type in ['Hostage Taking (Barricade Incident)', 'Hostage Taking (Kidnapping)']:
	                attack_codes.append(6)
	            elif attk_type == 'Unknown':
	                attack_codes.append(7)

	        data_region['attack']= attack_codes

	        attack_categories = ['Assault', 'Assassination', 'Bombing/Explosion', 'Facility/Infrastructure Attack',
	                            'Hijacking', 'Hostage Taking', 'Unknown']

	        # terrorist attacks by weapon
	        attack_count = np.asarray(data_region.groupby('attack').attack.count())
	        attack_percent = np.round(attack_count / sum(attack_count) * 100, 2)

	        # terrorist attack fatalities by weapon
	        attack_kills = np.asarray(data_region.groupby('attack')['kills'].sum())
	        for i in range(len(attack_kills)):
	            if attack_kills[i] == 0:
	                attack_kills[i] = 1
	        attack_yaxis = np.log10(attack_kills)

	        # terrorist attack injuries by weapon
	        attack_wounds = np.asarray(data_region.groupby('attack')['wounds'].sum())
	        for i in range(len(attack_wounds)):
	            if attack_wounds[i] == 0:
	                attack_wounds[i] = 1
	        attack_xaxis = np.log10(attack_wounds)

	        attack_text = []
	        for i in range(7):
	            attack_text.append(attack_categories[i] + ' (' + attack_percent[i].astype(str) 
	                            + '%)<br>' + attack_kills[i].astype(str) + ' Killed, '
	                            + attack_wounds[i].astype(str) + ' Wounded')
	            # print(attack_categories)

	        print("attack count", attack_count)
	            
	        attack_data = [go.Scatter(
	                x = attack_wounds,
	                y = attack_kills,
	                text = attack_text,
	                mode = 'markers',
	                hoverinfo = 'text',
	                marker = dict(
	                    size = attack_count/7,
	                    opacity = 0.9,
	                    color = 'rgb(45, 146, 240)')
	                )]

	        # attack_layout = go.Layout(title = 'Attack Type Distribution in ' + target_region + ' (1970-2017)', xaxis = dict(title = 'attack_wounds', type = 'log', range = [0, 4.5], tickmode = 'auto', nticks = 4, showline = True), yaxis = dict( title = 'Kills', type = 'log', range = [0, 4], tickmode = 'auto', nticks = 4, showline = True))

	        attack_annotations = []
	        for i in range(7):
	            attack_annotations.append(dict(x=attack_xaxis[i], y=attack_yaxis[i],
	                                    xanchor='center', yanchor='top',
	                                    text=attack_categories[i], showarrow=True))
	        # attack_layout['annotations'] = attack_annotations

	        # attack_figure = dict(data = attack_data, layout = attack_layout)
	        # iplot(attack_figure)
	        graphJSON = json.dumps({"data":attack_data, "annot":attack_annotations}, cls=plotly.utils.PlotlyJSONEncoder)
	        return graphJSON
