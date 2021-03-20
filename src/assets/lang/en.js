module.exports = {
    header: {
        title: "Data visualization system of Mopai Technology"
    },
    navMenu: {
        proItem: "Product Analysis",
        proList: "Product List ",
        proInfo: "Product Details",
        proTendency: "Product Sales Trend",
        categoryItem: "Category Analysis",
        categoryList: "Category List",
        categoryInfo: "Category Details",
        categoryTendency: "Category Layout",
        brandItem: "Brand Analysis",
        brandList: "Brand List",
        brandInfo: "Brand Details",
        brandTendency: "Brand Layout",
        styleItem: "Style Analysis",
        styleList: "Style List",
        styleInfo: "Style Details",
        styleTendency: "Style Layout",
        modelItem: "Model Analysis",
        modelList: "Model List",
        modelInfo: "Model Details",
        modelTendency: "Model Layout",
        customerItem: "Customer Analysis",
        customerList: "Customer List",
        customerInfo: "Customer Details",
        customerTendency: "Customer Layout",
        webSiteLog: "WebSite Log"
    },
    boss: {
        xCoordinate1: "salesDate",
        yCoordinate1: "salesQuantity",
        yCoordinate2: "salesAmount($)",
        dayChart: "Daily Sales Chart",
        dayChart2: "(nearly half a year)",
        weekChart: "Week Sales Chart",
        weekChart2: "(Nearly three years)",
        monthChart: "Month Sales Chart",
        seasonChart: "Season Sales Chart",
        yearChart: "Year Sales Chart",
        hotModel: "Top10 Hot Model",
        hotStyle: "Top10 Hot Style",
        hotSmallTitle: "(Nearly three months)",
        yNumber: "Quantity",
        inputInfo: "Please enter the number of days under four digits",
        switchTime: "SwitchTime:",
        switchTimeInfo: "last month",
        switchTimeInfo1: "last Three Months",
        switchTimeInfo2: "nearly half year",
        switchTimeInfo3: "nearly one year",
        switchTimeInfo4: "nearly three year",
        buttonInfo1: "confirm",
        pieTitleBrand: "Brand sales ratio chart",
        pieTitleCustomerGrade: "Customer-level ordering chart",
        pieTitleTreeLayout: "Rectangular tree diagram of sales details",
        category: "category",
        brand: "brand",
        style: "style",
        model: "model"
    },
    product: {
        list: {
            title: "Product List",
            proId: "pid",
            proCode: "proCode",
            barcode: "Barcode",
            proName: "name",
            inventory: "inventory",
            imgCount: "imgCount",
            salesQuantity: "salesQuantity",
            brand: "brand",
            categoryName: "category"
        },
        info: {
            lineTitle: "Product Sales Chart",
            salesQuantity: "salesQuantity",
            salesAmount: "salesAmount($)",
            salesDate: "salesDate",
            switchTime: "SwitchTime:",
            switchInfo: "nearly three months(day)",
            switchInfo1: "nearly six months(day)",
            switchInfo2: "nearly one year(day)",
            switchInfo3: "nearly three months(week)",
            switchInfo4: "nearly six months(week)",
            switchInfo5: "nearly one year(week)",
            switchInfo6: "month",
            switchInfo7: "season",
            switchInfo8: "year",
            pieTitleCustomerGrade: "Customer-level ordering chart",
            orderQty: "Order Qty",
            orderRatio: "Order Ratio"
        },
        tendency: {
            lineTitle: "Product Total Sales Chart",
            salesQuantity: "salesQuantity",
            salesAmount: "salesAmount($)",
            salesDate: "salesDate",
            switchTime: "switchTime: ",
            switchInfo: "month",
            switchInfo1: "day",
            switchInfo2: "year",
            switchInfo3: "nearly three month",
            switchInfo4: "nearly six month",
            switchInfo5: "nearly a year",
            switchInfo6: "nearly three year",
            replenish: "Product Replenishment Chart",
            smallTitle: "(nearly one year)",
            number: "number",
            ratio: "ratio",
            totalRatio: "accumulate ratio",
            replenishData: "Date",
            shipOut: "product Online-Offline Chart",
            ShipDate: "date",
            yData: "Online number",
            yData1: "Offline number",
            proTotalEvery: "Product Sales Plato Chart"
        }
    },
    category: {
        info: {
            lineTitle: "  Category Sales Chart",
            topProduct: "Top30 Product Chart",
            smallTitle: "(nearly three month sales data)",
            salesTotalQuantity: "cumulative quantity",
            salesTotalaccount: "cumulative account($)",
            gridTitle: "List of net products tabulation",
            proId: "productId",
            barcode: "barcode",
            onlineDate: "onlineDate",
            inventory: "inventory",
            customer: "customer",
            orderNum: "order",
            downloadData: "Download data",
            nearData: "nearly three month",
            nearLeft: "nearly ",
            dayRight: " days"
        },
        layout: {
            proTitle: "View of the category layout",
            proNumber: "product quantity",
            categoryName: "category",
            ratio: "ratio",
            ratio1: "ratio:",
            sales: "The cycle accumulates sales: ",
            salesQuantity: "salesQuantity",
            salesQuantity1: "salesQuantity：",
            treeTile: "Category Sales Tree Map",
            salesStatus: "sales status",
            barTitle: "Category Sales bar chart"
        }
    },
    brand: {
        info: {
            lineTitle: "  Brand Sales Chart"
        },
        layout: {
            title: "  Brand Sales Chart",
            brand: "brand",
            barTitle: "View of the brand layout",
            ratio: "ratio(%)",
            treeTitle: "Brand Sales Tree Map"
        }
    },
    style: {
        list: {
            switchTime: "switch time:",
            switchInfo: "nearly one month",
            switchInfo1: "nearly three month",
            switchInfo2: "nearly six month",
            switchInfo3: "nearly one year",
            switchInfo4: "nearly three year",
            salesQuantity: "  sales quantity: "
        },
        info: {
            lineTitle: "  Style Sales Chart"
        },
        layout: {
            title: "  Style Sales Chart",
            style: "style",
            barTitle: "View of the Style layout",
            ratio: "ratio(%)",
            treeTitle: "Style Sales Tree Map"
        }
    },
    model: {
        list: {
            switchTime: "switch time:",
            switchInfo: "nearly one month",
            switchInfo1: "nearly three month",
            switchInfo2: "nearly six month",
            switchInfo3: "nearly one year",
            switchInfo4: "nearly three year",
            salesQuantity: "  sales quantity: "
        },
        info: {
            lineTitle: "  Model Sales Chart"
        },
        layout: {
            title: "  Model Sales Chart",
            model: "model",
            barTitle: "View of the Model layout",
            ratio: "ratio(%)",
            treeTitle: "Model Sales Tree Map"
        }
    },
    customer: {
        info: {
            lineTitle: "  Customer Order Chart",
            orderQuantity: "order quantity",
            orderAccount: "order account($)",
            topTitle: "Top30 Order Chart",
            order: "order"
        },
        layout: {
            title: "Customer Order Grid",
            model: "(nearly 180 days)",
            customerId: "customerID",
            order: "order",
            orderQuantity: "order Quantity",
            orderAccount: "order Account($)",
            customerNumber: "customer number",
            grade: "grade",
            agencyTitle: "agency chart",
            agency: "agency",
            agencyNumber: "number",
            ratio: "ratio(%)",
            gradeTitle: "Customer Grade Chart"
        }
    },
    left: {
        history: "browsing history"
    }
};
