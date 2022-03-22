import { data } from "./data";

const getUserData = () => {
    const totalValue = data.reduce((acc, current) => acc + current.id, 0)
    const userData = data.map((user) => user.userId);
    console.log(userData);
};

getUserData();
