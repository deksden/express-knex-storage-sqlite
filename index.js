import KnexStorage from 'express-knex-storage'

export default (app) => {
  const knexStorage = KnexStorage(app)

  const aStorage = {
    db : {},
    name: 'KNEX-SQLite',
    processBeforeSaveToStorage: knexStorage.processBeforeSaveToStorage,
    processAfterLoadFromStorage: knexStorage.processAfterLoadFromStorage,
    mapPropToKnexTable: knexStorage.mapPropToKnexTable,

    initStorage: () => {
      // console.log('KNEX driver')
      let debug = false
      if (process.env.NODE_ENV === 'test' || process.env.DEBUG) debug = false
      return Promise.resolve()
        .then(() => Knex(
          {
            client: 'sqlite3',
            connection: {
              filename: app.env.KNEX_STORAGE_URL
            },
            useNullAsDefault: true,
            debug
          }
        ))
        .then((db) => {
          aStorage.db = db
          return app
        })
        .catch((err) => { throw err })
    },

    closeStorage: () => {
      // console.log('KNEX - close')
      return Promise.resolve()
        .then(() => app.storage.db.migrate.latest())
        .then(() => {
          app.storage.db.destroy()
          app.storage.db = null
        })
    },
    init: knexStorage.init,
    findById: knexStorage.findById,
    findOne: knexStorage.findOne,
    findAll: knexStorage.findAll,
    count: knexStorage.count,
    removeById: knexStorage.removeById,
    removeAll: knexStorage.removeAll,
    clearData: knexStorage.clearData,
    create: knexStorage.create,
    update: knexStorage.update
  }

  return aStorage
}