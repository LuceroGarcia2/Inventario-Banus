import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../pages/Diseños/grafica.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafica = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://localhost:3001/producto/contarPorMes');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();

        if (data.length === 0) {
          throw new Error('No se encontraron datos');
        }

        const labels = data.map(item => item.mes);
        const totals = data.map(item => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Productos Registrados',
              data: totals,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div className="chart-container"><p>Cargando gráfica...</p></div>;
  }

  if (error) {
    return <div className="chart-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="chart-container">
      <h2>Registro de Productos por Mes</h2>
      <div className="canvas-container">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Registro de Productos por Mes' }, }, }} />
      </div>
    </div>
  );
};

export default Grafica;
