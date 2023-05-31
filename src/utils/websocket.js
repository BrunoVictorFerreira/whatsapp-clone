import io from 'socket.io-client';
import { createNotifications } from '../store/actions/notifications';
import { useDispatch } from 'react-redux';

const socket = io("https://4bf8-2804-d59-8767-3f00-b877-acd6-f78b-12e.ngrok-free.app");

export function adicionarJogoResponse(props){
    socket.on("adicionar_jogo_response", (data)=>{
        props.dispatch(createNotifications({
            message: "Jogo entre " + data?.payload?.data?.create_game?.first_team_description?.[0]?.name + " X " + data?.payload?.data?.create_game?.second_team_description?.[0]?.name + " cadastrado!",
            title: "Novo Jogo Cadastrado"
        }))
        
    });
}
