from click import style
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt

data = pd.read_csv('data/t1-desk.csv')

fig = px.line(data, x = 'Time', y = 'Power', title='Power usage')
fig.show()

