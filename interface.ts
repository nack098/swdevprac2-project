interface RegisterData {
    name: string;
    email: string;
    tel: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface ArtToysData {
    sku: string,
    name: string,
    description: string,
    availableQuota: number,
    posterPicture: string,
}

interface OrderCreateData {
    artToy: string;
    orderAmount: number;
}

interface  OrderPutData {
    orderAmount: number;
}