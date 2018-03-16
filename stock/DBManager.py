import sqlite3
import pdb
import requests
# import time
import urllib
import sys

PREFIX = 'https://api.iextrading.com/1.0/'
BATCH = 'stock/market/batch?symbols='
TYPES = '&types=chart&range=5y'
BATCH_SIZE = 100

# Example Queries
# https://api.iextrading.com/1.0/ref-data/symbols
# https://api.iextrading.com/1.0/stock/market/batch?symbols=AAPL,MSFT&types=stats,price,quote,chart&range=5y


class DBManager(object):
    def __init__(self, db):
        self.conn = sqlite3.connect(db)
        self.conn.execute('pragma foreign_keys = on')
        self.conn.commit()
        self.cur = self.conn.cursor()

    def execute(self, stmt,args=[]):
        self.cur.execute(stmt,args)
        self.conn.commit()
        # return self.cur

    def executemany(self, stmt, args=[]):
        self.cur.executemany(stmt,args)
        self.conn.commit()
        # return self.cur

    def __del__(self):
        self.conn.close()


sql = DBManager('stocks.db')


def update_symbols():
    symbols = []
    url = PREFIX + 'ref-data/symbols'
    resp = requests.get(url)
    if resp.status_code == 404:
        print ('response 404')
        return

    data = resp.json()
    for d in data:
        values = (
            d['symbol'],
            d['name'],
            d['date'],
            int(d['isEnabled']),
            d['type'],
            int(d['iexId'])
        )
        symbols.append(values)
    sql.executemany('INSERT OR IGNORE INTO symbols VALUES (?,?,?,?,?,?)', symbols)


def create_tables():
    sql.execute('''CREATE TABLE symbols (
        symbol TEXT,
        name TEXT,
        date TEXT,
        isEnabled INGETER,
        type TEXT,
        iexId INTEGER
        unique (symbol)
    )''')

    sql.execute('''CREATE TABLE stock_data (
        symbol TEXT,
        date TEXT,
        open REAL,
        close REAL,
        unique (symbol, date)
    )''')

    sql.execute('''CREATE TABLE portfolio (
        user_id INTEGER,
        symbol TEXT,
        quantity INTEGER,
        unique (user_id, symbol)
    )''')

    sql.execute('''CREATE TABLE transactions (
        user_id INTEGER,
        symbol TEXT,
        date TEXT,
        price REAL,
        quantity INTEGER
    )''')


def get_hist(symbols, conn):
    history = []
    url = PREFIX + BATCH + symbols + TYPES
    print ('url: %s' % url)
    resp = requests.get(url)

    if resp.status_code == 404:
        print ('response 404')
        return

    data = resp.json()
    for sym in data:
        for chart in data[sym]['chart']:
            try:
                values = (
                    sym,
                    chart['date'],
                    float(chart['open']),
                    float(chart['close'])
                )
                history.append(values)
            except:
                # TODO: what to do when data is void?
                values = (
                    sym,
                    chart['date'],
                    float(0),
                    float(0)
                )
                history.append(values)

        sql.executemany('INSERT OR IGNORE INTO stock_data VALUES (?,?,?,?)', history)


def get_all_hist():
    symbol_list = ''
    size = 0
    total = 0
    for symbol in sql.execute('SELECT symbol FROM symbols'):
        symbol_list = symbol_list + symbol[0] + ','
        size = size + 1
        if size == BATCH_SIZE:
            get_hist(symbol_list,conn)
            size = 0
            total = total + BATCH_SIZE
            symbol_list = ''
            print ('%d updated' % total)
            # time.sleep(2)

    if symbol_list != '':
        get_hist(symbol_list,conn)


def main():
    if len(sys.argv) < 2:
        print ('usage: python3 DBManager.py [command]')
        print ('\tupdate_symbols')
        print ('\tupdate_data')
        print ('\tcreate_tables')
        return

    if sys.argv[1] == 'update_symbols':
        update_symbols()

    elif sys.argv[1] == 'update_data':
        get_all_hist()

    elif sys.argv[1] == 'create_tables':
        create_tables()

    else:
        print ('usage: python3 DBManager.py [command]')
        print ('\tupdate_symbols')
        print ('\tupdate_data')
        print ('\tcreate_tables')


if __name__ == '__main__':
    main()
