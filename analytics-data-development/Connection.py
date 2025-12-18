import sqlite3
from sqlite3 import Error

class Connection():

    def create_conecction(db_file):
        """ Creates a conection on the SQLite database
        :param db_file: Database name
        """
        conn = None
        try:
            conn = sqlite3.connect(db_file)
            print('Database created')
        except Error as e:
            print(e)
        return conn

    def execute(self, conn, sql):
        """ Executes a command with a cursor
        :param conn: Connection object
        :param sql: SQL command
        """
        try:
            c = conn.cursor()
            c.execute(sql)
        except Error as e:
            print(e)

if __name__ == '__main__':
    connection = Connection('creditas.db')
