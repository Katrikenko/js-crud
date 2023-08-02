// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = new Date().toISOString()
  }

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id)

    if (product) {
      this.update(product, data)

      return true
    } else {
      return false
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  console.log(Product.getList())

  res.render('alert', {
    style: 'alert',
    data: {
      info: 'Товар був успішно створений',
    },
  })
})

// ================================================================

router.get('/product-list', function (req, res) {
  const list = Product.getList()

  res.render('product-list', {
    style: 'product-list',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },

    productList: {
      cards: [
        // {
        //   title: 'Стильна сукня',
        //   description:
        //     'Елегантна сукня з натуральної тканини для особливих випадків',
        //   id: 1357924680,
        //   price: 1500,
        // },
        // {
        //   title: 'Спортивні кросівки',
        //   description:
        //     'Зручні та стильні кросівки для активного способу життя',
        //   id: 9876543210,
        //   price: 1200,
        // },
        // {
        //   title: 'Сонячні окуляри',
        //   description:
        //     'Модні окуляри з високоякісними лінзами для захисту очей від сонця',
        //   id: 2468135790,
        //   price: 800,
        // },
        // {
        //   title: 'Чоловічий годинник',
        //   description:
        //     'Елегантний годинник з механічним механізмом і сталевим браслетом',
        //   id: 8024679135,
        //   price: 2500,
        // },
        // {
        //   title: 'Жіночий рюкзак',
        //   description:
        //     'Стильний рюкзак з великими відділенями та кишенями',
        //   id: 3192850467,
        //   price: 900,
        // },
        // {
        //   title: 'Парасолька',
        //   description:
        //     'Компактна парасолька з автоматичним механізмом',
        //   id: 6749258130,
        //   price: 350,
        // },
        // {
        //   title: 'Столові прибори',
        //   description:
        //     'Набір столових приборів зі сталі виготовлених в класичному стилі',
        //   id: 5036214789,
        //   price: 600,
        // },
        // {
        //   title: 'Шкіряний гаманець',
        //   description:
        //     'Елегантний гаманець з натуральної шкіри з багатьма відділенями',
        //   id: 7261943580,
        //   price: 400,
        // },
        // {
        //   title: 'Фітнес-браслет',
        //   description:
        //     "Браслет для відстеження активності та здоров'я",
        //   id: 1584079263,
        //   price: 700,
        // },
      ],
    },
  })
})

// ===============================================================

router.get('/product-edit', function (req, res) {
  const { id } = req.query

  console.log(id)

  const product = Product.getById(Number(id))

  console.log(product)

  console.log(Product.getList())

  if (product) {
    res.render('product-edit', {
      style: 'product-edit',
      data: {
        product,
      },
    })
  } else {
    res.render('alert', {
      style: 'alert',
      data: {
        info: 'Товар з таким ID не знайдено',
      },
    })
  }
})

// ===============================================================

router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body

  const product = Product.getById(Number(id))

  if (product) {
    this.name = name
    this.price = price
    this.description = description
    // this.id = id

    res.render('alert', {
      style: 'alert',
      data: {
        info: 'Товар успішно оновлено',
      },
    })
  } else {
    res.render('alert', {
      style: 'alert',
      data: {
        info: 'Товар з таким ID не знайдено',
      },
    })
  }
})

// ============================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Товар був успішно видаленний',
  })
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
