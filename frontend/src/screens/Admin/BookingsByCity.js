import { Polar } from "react-chartjs-2";

const BookingsByCity = (props) => {
    const data = props.data;

    return (
        <div style={{ textAlign: "center" }}>
            <Polar
                height={120}
                data={{
                    labels: Object.keys(data.bookings_by_city),
                    datasets: [
                        {
                            label: "Số lượt đặt",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                            data: Object.values(data.bookings_by_city),
                        },
                    ],
                }}
                options={{
                    legend: {
                        display: true,
                        position: "top",
                    },
                    scale: {
                        ticks: {
                            display: false,
                        },
                    },
                }}
            />
            <div style={{ margin: "10px 0 20px 0" }}>Thống kê số lượng đặt phòng theo các thành phố</div>
        </div>
    );
};

export default BookingsByCity;
