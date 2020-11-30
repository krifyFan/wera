declare global {
    interface Date {
        format(format: string): string
    }
}

// Definitions by: gonghuijun
declare module 'view-design/types/upload' {
    export interface Upload {
        fileList: any[]
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        [key: string]: any
    }
}

declare module 'vue-pdf'

export {}
