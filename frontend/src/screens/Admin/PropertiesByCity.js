import { Doughnut } from "react-chartjs-2";

const PropertiesByCity = (props) => {
    const data = props.data;

    return (
        <div style={{ textAlign: "center", width: "100%", margin: "0 auto" }}>
            <Doughnut
                height={80}
                data={{
                    labels: Object.keys(data.properties_by_city),
                    datasets: [
                        {
                            label: "Số chỗ nghỉ",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                            data: Object.values(data.properties_by_city),
                        },
                    ],
                }}
            />
            <div style={{ margin: "30px 0 20px 0" }}>Thống kê số chỗ nghỉ theo các thành phố</div>
        </div>
    );
};

export default PropertiesByCity;
