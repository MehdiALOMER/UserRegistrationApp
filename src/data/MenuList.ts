export const menuList = [
    {
        id: 1,
        name: "Lorem Ipsum 1",
        icon: "account",
        isOpen: false,
        submenuList: [
            {
                id: 1,
                name: "Lorem Ipsum 1.1",
                icon: "account",
                image: "report",
                screen: "CurrentCardList",
                isSelect: false
            },
            {
                id: 2,
                name: "Lorem Ipsum 1.2",
                icon: "account",
                image: "report",
                screen: "CurrentTransactionList",
                isSelect: false
            },
        ]
    },
    {
        id: 2,
        name: "Lorem Ipsum 2",
        icon: "stocking",
        isOpen: false,
        submenuList: [
            {
                id: 1,
                name: "Lorem Ipsum 2.1",
                icon: "stocking",
                image: "report",
                screen: "StockCardList",
                isSelect: false
            },
            {
                id: 2,
                name: "Lorem Ipsum 2.2",
                icon: "stocking",
                image: "report",
                screen: "StockTransactionList",
                isSelect: false
            },
            {
                id: 3,
                name: "Lorem Ipsum 2.3",
                icon: "stocking",
                isOpen: false,
                submenuList: [
                    {
                        id: 1,
                        name: "Lorem Ipsum 2.3.1",
                        icon: "stocking",
                        image: "report",
                        screen: "UnitList",
                        isSelect: false
                    },
                    {
                        id: 2,
                        name: "Lorem Ipsum 2.3.2",
                        icon: "stocking",
                        image: "report",
                        screen: "PriceList",
                        isSelect: false
                    }
                ]
            },
        ]
    }
];