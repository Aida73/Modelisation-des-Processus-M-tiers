
export interface Order {
    order_id?: string,
    service: string,
    status: string,
    order_date: Date,
    service_delivery_date: Date,
    client_id: string
}

export interface Devis {
    "devis_id": string,
    "status": string,
    "devis_date": string,
    "devis_delivery_date": string,
       "order_id": string
}

export interface DevisDetail {
    "devis_id": string,
    "status": string,
    "devis_date": string,
    "devis_delivery_date": string,
    "order_id": string,
    "order": Order
}

