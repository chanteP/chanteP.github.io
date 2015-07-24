style = require './style.scss'
drawer = require '../../../../common/animator/drawer'
mask = require '../../../../common/components/mask'
dialog = require '../../../../common/components/dialog'
base = require '../../../../lib/base'
jsxRender = require './render.jsx'
CategorySelector = require './CategorySelector.coffee'
cont = drawer ''
dataAPI = undefined
categoryMap = undefined
categoryLoaded = false
queryUrl = '/category/app'
io = require '../io'
categoryBackFunc = undefined
base.insertStyle style

queryCategory = (categoryId) ->
    if !dataAPI.get('categoryId')
        base.componentHandler.block = true
    cont.block = true
    mask.show 9999, '品类数据请求中...'
    io.get queryUrl, {}, ((data) ->
        cont.block = false
        categoryMap = buildCategoryList data
        categoryLoaded = true
        mask.hide()
        render categoryId
    ), (msg) ->
        #TODO
        cont.block = false
        mask.hide()
        dialog().show {
            type: 'error'
            content: msg or '暂不支持上单，请稍后重试'
        }, true

buildCategoryList = (cateArray) ->
    levelOne = {}
    levelTwo = {}
    levelThree = {}
    for cate in cateArray
        switch cate.level
            when 1 then levelOne[cate.id] = cate
            when 2 then levelTwo[cate.id] = cate
            when 3 then levelThree[cate.id] = cate

    {levelOne, levelTwo, levelThree}


render = (categoryId) ->
    if categoryLoaded
        #jsxRender cont.node, showList, cascadeId
        c = new CategorySelector categoryMap, categoryId
        m.mount cont.node, c
    else
        queryCategory categoryId

show = ->
    cont.show
        title: '选择品类'
        onBack: ->
            if !dataAPI.get('categoryId')? and categoryBackFunc
                categoryBackFunc()
            return
    render dataAPI.get('categoryId')
    return

module.exports = (dataHandler, node, editable) ->
    dataAPI = dataHandler
    dataAPI.onload ->
        dataAPI.checkToggle 'category', dataAPI.get('categoryId'), (node) ->
            node.innerHTML = '<span>' + dataAPI.get('categoryName') + '</span>'
            return
        if dataAPI.get('isOnline')
            editable = false
        return
    if !editable
        return

    $(node).on 'tap', ->
        if !editable
            return
        show()
        return

    {
        show: show
        setOnBack: (backFunc) ->
            categoryBackFunc = backFunc
    }

### example category object
id: 4
leaf: false
level: 1
name: "生活服务"
parentId: 0
priceRate: null
support: false
###
