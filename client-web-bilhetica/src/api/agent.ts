import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginationResponse } from "../app/models/pagination";
import { history } from "..";
import { store } from "../app/store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config: any) => {
    const token = store.getState().account.user?.token;

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axios.interceptors.response.use(
    async (response) => {
        if (process.env.NODE_ENV === "development") await sleep();

        const pagination = response.headers["pagination"];

        if (pagination) {
            response.data = new PaginationResponse(
                response.data,
                JSON.parse(pagination)
            );
        }

        return response;
    },
    (error) => {
        const { data, status } = error.response!;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }

                    throw modelStateErrors.flat();
                }
                break;
            case 401:
                break;
            case 500:
                history.push({
                    pathname: "/server-error",
                    state: { error: data },
                });
                break;
            default:
                break;
        }

        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string, params?: URLSearchParams) =>
        axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string, body?: {}) => axios.delete(url).then(responseBody),
};

const ICAODesignator = {
    list: (params: URLSearchParams) =>
        requests.get("ICAOTDesignators/geticaotypes", params),
    details: (id: number) => requests.get(`ICAOTDesignators/geticaobyid/${id}`),
    create: (values: any) =>
        requests.post("ICAOTDesignators/createicaotypes", values),
    update: (values: any) =>
        requests.put("ICAOTDesignators/updateicao", values),
    delete: (icaoId: number) =>
        requests.delete(`ICAOTDesignators/deleteicao/${icaoId}`),
};

const FlightCompany = {
    list: (params: URLSearchParams) =>
        requests.get("FlightCompanies/getflightcompanies", params),
    create: (values: any) =>
        requests.post("FlightCompanies/createflightcompany", values),
    details: (id: number) =>
        requests.get(`FlightCompanies/getflightcompanyid/${id}`),
    update: (values: any) =>
        requests.put("FlightCompanies/updateflightcompany", values),
    delete: (fcId: number) =>
        requests.delete(`FlightCompanies/deleteflightcompany/${fcId}`),
    listNames: () => requests.get("FlightCompanies/getflightcompanynames"),
    listOptions: () => requests.get("FlightCompanies/getflightcompanyoptions"),
};

const Aircraft = {
    list: (params: URLSearchParams) =>
        requests.get("AirCrafts/getaircrafts", params),
    fetchOptions: () => requests.get("AirCrafts/aircraftOptions"),
    create: (values: any) => requests.post("AirCrafts/createaircraft", values),
    details: (id: number) => requests.get(`AirCrafts/getaircraftbyid/${id}`),
    deleteCabinUpdate: (values: any) =>
        requests.put("AirCrafts/deletecabinupdate", values),
    createCabinUpdate: (values: any) =>
        requests.put("AirCrafts/createcabinupdate", values),
    updateCabinColumns: (values: any) =>
        requests.put("AirCrafts/updatecolumns", values),
};

const Airport = {
    list: (params: URLSearchParams) =>
        requests.get("Airports/getairports", params),
    fetchOptions: () => requests.get("Airports/airportOptions"),
    listBySearchTerm: (params: URLSearchParams) =>
        requests.get("Airports/cityAirports", params),
};

const Flight = {
    listAllAiportsByRegion: (params: URLSearchParams) =>
        requests.get("Flights/getairportsbyregion", params),
    listAircrafts: (params: URLSearchParams) =>
        requests.get("AirCrafts/getaircrafts", params),
    create: (values: any) => requests.post("Flights/createflight", values),
    listFlights: (params: URLSearchParams) =>
        requests.get("Flights/getflights", params),
    details: (id: number) => requests.get(`Flights/getflightbyid/${id}`),
    updateFlight: (values: any) => requests.put("Flights/updateflight", values),
    searchFlights: (params: URLSearchParams) =>
        requests.get("Flights/getflightsbysearch", params),
    delete: (id: number) => requests.delete(`Flights/deleteflight/${id}`),
};

const Account = {
    login: (values: any) => requests.post("Account/loginuser", values),
    register: (values: any) => requests.post("Account/register", values),
    recoverPassword: (values: any) =>
        requests.post("Account/recoverpassword", values),
    changePassword: (values: any) =>
        requests.put("Account/changepassword", values),
    changeUser: (values: any) => requests.put("Account/changeuser", values),
};

const FlightReservation = {
    flightById: (id: number) =>
        requests.get(`Flights/getflightseatmapbyid/${id}`),
};

const Ticket = {
    create: (values: any) =>
        requests.post("Tickets/createflightticket", values),
    list: (values: any) => requests.post("Tickets/getusertickets", values),
};

const Stripe = {
    Pay: (values: any) => requests.post("Stripe/payment", values),
};

const Team = {
    CreateTeamMember: (values: any) =>
        requests.post("Team/createteammember", values),
    list: () => requests.get("Team/getteammembers"),
    details: (id: string) => requests.get(`Team/getteammemberbyid/${id}`),
    updateTeamMember: (values: any) =>
        requests.put("Team/updateteammember", values),
    delete: (id: string) => requests.delete(`Team/deleteteammember/${id}`),
};

const agent = {
    ICAODesignator,
    FlightCompany,
    Aircraft,
    Airport,
    Flight,
    Account,
    FlightReservation,
    Ticket,
    Stripe,
    Team,
};

export default agent;
