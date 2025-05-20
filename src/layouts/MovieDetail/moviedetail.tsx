import { useParams } from "react-router-dom";
import style from "./moviedetail.module.css";
import movieService from "../../services/movieService";
import { useEffect, useRef, useState } from "react";
import { MovieModel } from "../../models/Movie";
import movieHallService from "../../services/movieHallService";
import Modal from "../MovieModal";
import { Seat, SeatDTO } from "../../models/seat";
import seatService from "../../services/seatService";
import { MovieHall } from "../../models/moviehall";
import loginService from "../../services/loginService";
import reservationService from "../../services/reservationService";
import { QRCodeCanvas } from "qrcode.react";


const MovieDetail: React.FC = () => {

    const hoy = new Date();

    const qrRef = useRef<HTMLDivElement>(null);
    const fechaFormateada = hoy.toLocaleDateString('es-ES');
    const [qrContnet, setQrContnet] = useState<string>('');
    const { id } = useParams() as { id: string };
    const [movie, setMovie] = useState<MovieModel>();
    const [hall, setHall] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);
    const [isModalQROpen, setIsModalQROpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState<SeatDTO[]>([]);
    const [seats, setSeats] = useState<SeatDTO[]>();
    const initialStates = [true, false]; // true = habilitado, false = deshabilitado
    const [enabledStates, setEnabledStates] = useState<boolean[]>(initialStates);
    const [movieHall, setMovieHall] = useState<MovieHall>();
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>('');
    const [fecha, setFecha] = useState<Date>(new Date());
    const [nombre, setNombre] = useState<string>('');




    const loadMovie = async (id: number) => {
        try {
            const movieDetail = await movieService.getMovieById(id);
            const movieHallDetail = await movieHallService.getHallByMovieId(id);
            const seats_data = await seatService.getSeatByHallId(movieHallDetail[0].id_sala);
            setMovieHall(movieHallDetail[0]);
            setSeats(seats_data);
            setHall(movieHallDetail[0].numero_sala);
            setMovie(movieDetail);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (seats) {
            setEnabledStates(seats.map(() => false));
        }
    }, [seats])

    useEffect(() => {

        loadMovie(Number(id));
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const pago = selectedSeats.length * 150;
        setFecha(hoy);
        const reservationData = new FormData();
        if (!movieHall) return;

        try {


            let token = sessionStorage.getItem('auth-token');
            let userdata = await loginService.getTokenData(token as string);
            reservationData.append('id_salapelicula', movieHall?.id.toString());
            reservationData.append('fecha_reserva', fecha.toISOString());
            reservationData.append('nombre', nombre);
            reservationData.append('numero_tarjeta', numeroTarjeta?.toString());
            reservationData.append('total_pago', pago?.toString());
            reservationData.append('id_usuario', userdata.id)

            let saveData = await reservationService.postReservation(reservationData);

            selectedSeats.forEach(async (seat) => {
                const updateSeatReservation = await seatService.updateReservationSeats(seat.id, userdata.id);
            });

            setQrContnet(JSON.stringify({ 'asientos': selectedSeats, 'salapelicula': movieHall, 'fecha': fechaFormateada }));

        } catch (error) {
            console.log(error);
        }


        //   selectedSeats.forEach(async (seat)  => {
        //     const formData = new FormData();
        //     formData.append('id', seat.id.toString());





        //     try {
        //         const updateSeatReservation = await seatService.updateReservationSeats(seat.id);

        //     } catch (error) {
        //         console.log(error);
        //         alert("No se puede actualizar la sala y la pelicula")
        //     }

        // });


    }

    const handleDownload = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'codigo_qr.png';
        a.click();
    };



    const handleColorClick = (index: number) => {
        const newStates = [...enabledStates];
        newStates[index] = !newStates[index];
        setEnabledStates(newStates);

        seats?.some(function (entry, i) {
            if (index === i) {
                selectedSeats.push(entry);
                return true;
            }
            return false;
        });
    }


    const generateTable = () => {

        if (!seats) return null;

        const seatsByRow: { [fila: string]: Seat[] } = {};

        seats.forEach((seat) => {
            if (!seatsByRow[seat.fila]) {
                seatsByRow[seat.fila] = [];
            }

            seatsByRow[seat.fila].push(seat);

        });

        const sortedRows = Object.entries(seatsByRow).sort((a, b) => a[0].localeCompare(b[0]));

        const rows = sortedRows.map(([fila, seatsInRow]) => {
            const sortedSeats = seatsInRow.sort();
            const cells = sortedSeats.map((seat) => {
                const index = seats.findIndex((s) => s.fila === seat.fila && s.columna === seat.columna);

                return (
                    <td key={`${seat.fila}-${seat.columna}`}>
                        <button onClick={() => handleColorClick(index)} style={{ padding: 0, border: 'none', background: 'none' }}>
                            <div className={style["cine-icon"]}>
                                <svg className={enabledStates[index] ? style["svg-active"] : style["svg-inactive"]} width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
                                    <path className="cls-1" d="M9.14,1.5h5.73a2.86,2.86,0,0,1,2.86,2.86v9.55a0,0,0,0,1,0,0H6.27a0,0,0,0,1,0,0V4.36A2.86,2.86,0,0,1,9.14,1.5Z" />
                                    <path className="cls-1" d="M1.5,10.09H6.27a0,0,0,0,1,0,0v3.34a2.39,2.39,0,0,1-2.39,2.39h0A2.39,2.39,0,0,1,1.5,13.43V10.09A0,0,0,0,1,1.5,10.09Z" />
                                    <path className="cls-1" d="M17.73,10.09H22.5a0,0,0,0,1,0,0v3.34a2.39,2.39,0,0,1-2.39,2.39h0a2.39,2.39,0,0,1-2.39-2.39V10.09A0,0,0,0,1,17.73,10.09Z" />
                                    <path className="cls-1" d="M4.6,15.7h0a2.08,2.08,0,0,0-.23.95,2,2,0,0,0,2,2H17.61a2,2,0,0,0,2-2,2.08,2.08,0,0,0-.23-.95,0,0,0,0,1,0,0" />
                                    <polyline className="cls-1" points="17.79 13.98 17.73 13.91 6.27 13.91 6.21 13.98" /><line className="cls-1" x1="7.23" y1="22.5" x2="7.23" y2="18.68" /><line className="cls-1" x1="16.77" y1="22.5" x2="16.77" y2="18.68" /><line className="cls-1" x1="5.32" y1="22.5" x2="9.14" y2="22.5" /><line className="cls-1" x1="14.86" y1="22.5" x2="18.68" y2="22.5" /></svg>
                                <span className={style["number"]}>{`${seat.fila}-${seat.columna}`}</span>
                            </div>
                        </button>

                    </td>
                );
            });

            return <tr key={fila}>{cells}</tr>
        });



        return <table><tbody>{rows}</tbody></table>;
    };




    return (<section className={style["movie-detail-section"]}>
        <img src={movie?.imagen} className={style['movie-detail-img']} alt="" />
        <div>
            <div className={style['movie-detail-cont']}>
                <label className={style['movie-detail-label']} htmlFor="movieName">Nombre de la pelicula:  </label>
                <p id="movieName">{movie?.nombre}</p>
            </div>

            <div className={style['movie-detail-cont']}>
                <label className={style['movie-detail-label']} htmlFor="movieDuration">Duracion de la pelicula:  </label>
                <p id="movieDuration">{movie?.duracion} minutos</p>
            </div>

            <div className={style['movie-detail-cont']}>
                <label className={style['movie-detail-label']} htmlFor="moviePublic">Clasificacion:  </label>
                <p id="moviePublic">{movie?.clasificacion}</p>
            </div>

            <div className={style['movie-detail-cont']}>
                <label className={style['movie-detail-label']} htmlFor="moviePublic">Sala de Emision:  </label>
                <p id="moviePublic">{hall}</p>
            </div>

            <div className={style['movie-detail-contSinop']}>
                <label className={style['movie-detail-label']} htmlFor="movieSinop">Sinopsis:  </label>
                <p className={style['movie-detail-sinopsis']} id="movieSinop">{movie?.sinopsis}</p>
            </div>

            <div className={style['movie-detail-cont']}>
                <button onClick={() => setIsModalOpen(true)}>Elegir asientos</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div id='container-table'>
                    {generateTable()}
                </div>
                <hr />

                <div className={style['container-reservation']}>
                    <button onClick={() => setIsModalReservationOpen(true)}>Realizar reservacion</button>
                </div>

            </Modal>

            <Modal isOpen={isModalReservationOpen} onClose={() => { setIsModalReservationOpen(false) }}>
                <div className={style["movie-detail-reservation"]}>
                    <img src={movie?.imagen} className={style['movie-detail-reservation-img']} alt="" />
                    <form onSubmit={handleSubmit} className={style['form-reservation']}>
                        <div className={style['movie-reservation-indic']}>
                            <label className={style['movie-detail-label']} htmlFor="movieName"><b>Ingrese los datos solicitados</b> </label>
                        </div>

                        <div className={[style['container-reservationform']].join(' ')}>
                            <div className={style.entryarea}>
                                <input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={style['input-form-m']} type="text" required />
                                <label htmlFor="nombre" className={style.labelline}>Nombre</label>
                            </div>
                        </div>


                        <div className={[style['container-reservationform']].join(' ')}>
                            <div className={style.entryarea}>
                                <input name="tarjeta" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} className={style['input-form-m']} type="text" required />
                                <label htmlFor="tarjeta" className={style.labelline}>Numero de tarjeta</label>
                            </div>
                        </div>

                        <div className={style['movie-reservation-label']}>
                            <label className={style['movie-detail-label']} htmlFor="movieName">Fecha de facturación: {fechaFormateada} </label>
                        </div>

                        <div className={style['movie-reservation-label']}>
                            <label className={style['movie-detail-label']} htmlFor="movieName">Total de pago: {selectedSeats?.length * 150} C$ </label>
                        </div>

                        <div className={style['movie-reservation-button']}>
                            <button onClick={() => setIsModalQROpen(true)}>Completar pago</button>
                        </div>

                    </form>
                </div>
            </Modal>

            <Modal isOpen={isModalQROpen} onClose={() => setIsModalQROpen(false)}>
                <div ref={qrRef}>
                    <QRCodeCanvas value={qrContnet} size={200} />
                </div>


                <div className={style['container-reservation']}>
                    <button onClick={handleDownload}>Descargar QR</button>
                </div>

            </Modal>




        </div>

    </section>)
}


export default MovieDetail;


