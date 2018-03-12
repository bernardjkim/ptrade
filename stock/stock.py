import sqlite3
import pdb
import requests
import time
import urllib
# import os
import sys

# iex url prefix
PREFIX = 'https://api.iextrading.com/1.0/'

BATCH = 'stock/market/batch?symbols='

# TYPES = '&types=stats,price,quote,chart'
TYPES = '&types=chart&range=5y'

# max batch size
BATCH_SIZE = 100

# https://api.iextrading.com/1.0/ref-data/symbols

# https://api.iextrading.com/1.0/stock/aapl/stats

# stock/market/batch?symbols=aapl,fb&types=stats,price

# https://api.iextrading.com/1.0/stock/market/batch?symbols=AAPL,MSFT&types=stats,price,quote,chart&range=5y


def update_symbols():
    conn = sqlite3.connect('stocks.db')
    c = conn.cursor()

    url = PREFIX + 'ref-data/symbols'
    resp = requests.get(url)
    if resp.status_code == 404:
        print ('response 404')
        return
    data = resp.json()
    symbols = []
    for d in data:
        values = (d['symbol'],
                  d['name'],
                  d['date'],
                  int(d['isEnabled']),
                  d['type'],
                  int(d['iexId']))
        symbols.append(values)
    c.executemany('INSERT OR IGNORE INTO symbols VALUES (?,?,?,?,?,?)', symbols)

    conn.commit()
    conn.close()


def create_tables():
    conn = sqlite3.connect('stocks.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE symbols (
        symbol TEXT,
        name TEXT,
        date TEXT,
        isEnabled INGETER,
        type TEXT,
        iexId INTEGER
        unique (symbol)
    )''')

    c.execute('''CREATE TABLE stock_data (
        symbol TEXT,
        date TEXT,
        open REAL,
        close REAL,
        unique (symbol, date)
    )''')

    c.execute('''CREATE TABLE portfolio (
        user_id INTEGER,
        symbol TEXT,
        quantity INTEGER,
        unique (user_id, symbol)
    )''')

    c.execute('''CREATE TABLE transactions (
        user_id INTEGER,
        symbol TEXT,
        date TEXT,
        price REAL,
        quantity INTEGER
    )''')

    conn.close()

def get_hist(symbols, conn):

    c = conn.cursor()

    url = PREFIX + BATCH + symbols + TYPES
    print ('url: %s' % url)
    resp = requests.get(url)

    if resp.status_code == 404:
        print ('response 404')
        return

    data = resp.json()

    history = []
    for sym in data:
        for chart in data[sym]['chart']:
            try:
                values = (sym,
                        chart['date'],
                        float(chart['open']),
                        float(chart['close']))
                history.append(values)
            except:
                # TODO: what to do when data is void?
                values = (sym,
                        chart['date'],
                        float(0),
                        float(0))
                history.append(values)

        c.executemany('INSERT OR IGNORE INTO stock_data VALUES (?,?,?,?)', history)

    conn.commit()


def get_all_hist():

    conn = sqlite3.connect('stocks.db')
    c = conn.cursor()

    symbol_list = ''
    size = 0
    total = 0
    for symbol in c.execute('SELECT symbol FROM symbols'):
        symbol_list = symbol_list + symbol[0] + ','
        size = size + 1
        if size == BATCH_SIZE:
            get_hist(symbol_list,conn)
            size = 0
            total = total + BATCH_SIZE
            symbol_list = ''
            print ('%d updated' % total)
            # time.sleep(2)

    conn.close()


def main():
    # create_tables()
    # update_symbols()
    get_all_hist()



if __name__ == '__main__':
    main()
