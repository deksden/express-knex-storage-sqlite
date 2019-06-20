# Express Knex Server project, SQLite storage support add-on

Add-on will return app's storage object initialized with Knex SQLite driver 
and will expect that object will be stored as **app.storage**

Object structure:
    
    app.storage
    app.storage.db: KNEX query builder initialized with SQLite driver 
    app.env.KNEX_STORAGE_URL: full path to SQLite database file
    
    app.storage.initStorage(): function will return promise to open database connection
    app.storage.closeStorage(): function will return promise to close database connection
    
