

export interface ErrorData {
    timestamp: string;
    statusCode: number;
    error: string;
    errorCode?: string;
    message: string;
    errors?: string[];
}