export interface Page {
    pageTotal: number,
    pageNum: number,
    pageSize: number
}

export interface Title {
    name: string,
    showFlag: boolean,
    turnTo: string
}

export interface TableColumn {
    title: string,
    width?: number,
    key?: string,
    align?: string,
    render?: any
}
