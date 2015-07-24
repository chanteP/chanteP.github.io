class CategorySelector
    constructor: ({
            levelOne, levelTwo, levelThree
        }, categoryId) ->

        console.log levelOne
        console.log categoryId

        @levelOne = if levelOne? then levelOne else {}
        @levelTwo = if levelTwo? then levelTwo else {}
        @levelThree = if levelThree? then levelThree else {}

        @levelThreeId = if categoryId? then categoryId
        @levelTwoId =
            if @levelThreeId?
                (id for id, cate of @levelTwo when cate.id == @levelThreeId)[0]

        @levelOneId =
            if @levelTwoId?
                (id for id, cate of @levelOne when cate.id == @levelTwoId)[0]
            else
                (id for id of @levelOne)[0]

    view: ->
        m '.category-outer',
            m '.category-desc',
                m 'div', "费率说明：美团从您售卖的服务中收取的服务费，即扣点。"

            m '.category-cont.clearfix',
                m 'ul.levelOne',
                    for id, cate of @levelOne
                        m 'li', cate.name

                m 'ul.levelTwo',
                    for id, cate of @levelTwo
                        m 'li', cate.name




module.exports = CategorySelector

### example category object
id: 4
leaf: false
level: 1
name: "生活服务"
parentId: 0
priceRate: null
support: false
###
