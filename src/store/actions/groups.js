import moment from 'moment'
import { GROUPS, MATCHS, TEAMS_FOR_GROUP, ALL_TEAMS_FOR_GROUP, MENSAGENS_SUPORTE, SUPORTE } from '../../utils/constants'
import { gql } from '@apollo/client';


export const groups = (token) => {
    return (dispatch, getState) => {
        dispatch({
            type: GROUPS,
            isQL: true,
            $payload: {
                token,
                body: ` 
                groups{
                    id
                    name
                  }
                `
            }
        })
    }

}
export const matchs = (token) => {
    return (dispatch, getState) => {
        dispatch({
            type: MATCHS,
            isQL: true,
            $payload: {
                token,
                body: ` 
                matchs(orderBy: [{ column: DATE, order: ASC }]){
                    id
                    first_team
                    second_team
                    important
                    first_turn
                    second_turn
                    third_turn
                    octaves_turn
                    fourth_turn
                    semi_turn
                    date
                    final_turn
                    historic{
                        id
                        match_id
                        descricao
                        created_at
                        updated_at
                        deleted_at
                    }
                    informacao_partida{
                        id
                        match_id
                        first_team
                        second_team
                        informacoes
                        created_at
                        updated_at
                        deleted_at
                    }
                    formacao{
                        id
                        match_id
                        first_team
                        second_team
                        first_formation
                        second_formation
                        created_at
                        updated_at
                        deleted_at
                    }
                result{
                    first_team
                    second_team
                }
                    first_team_description{
                        id
                        name
                        group_id
                        brasao{
                            url
                        }
                        jogador{
                            nome
                            numero
                            imagem_jogador{
                                path
                            }
                        }
                        informations{
                            id
                            pts
                            vit
                            emp
                            der
                            gols
                            sg
                        }
                    }
                    second_team_description{
                        id
                        name
                        group_id
                        brasao{
                            url
                        }
                        jogador{
                            nome
                            numero
                            imagem_jogador{
                                path
                            }
                        }
                        informations{
                            id
                            pts
                            vit
                            emp
                            der
                            gols
                            sg
                        }
                    }
                }
                `
            }
        })
    }

}
export const teamsForGroup = (group_id, token) => {
    return (dispatch, getState) => {
        dispatch({
            type: TEAMS_FOR_GROUP,
            isQL: true,
            $payload: {
                token,
                body: ` 
                teams_for_group(group_id: ${group_id}){
                    id
                    name
                    id
                    name
                    brasao{
                        id
                        url
                    }
                    informations{
                        pts
                        vit
                        emp
                        der
                        gols
                        sg
                    }
                    
                  }
                `
            }
        })
    }

}
export const allTeamsForGroup = (token) => {
    return (dispatch, getState) => {
        dispatch({
            type: ALL_TEAMS_FOR_GROUP,
            isQL: true,
            $payload: {
                token,
                body: ` 
                all_teams_for_group{
                    id
                    grupo
                teams{
                    id
                    name
                    brasao{
                        url
                    }
                    informations{
                        pts
            vit
            emp
            der
            gols
            sg
        
                    }
                }
                }
                `
            }
        })
    }

}

export const mensagensSuporte = (token, usuario_id, tipo) => {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAGENS_SUPORTE,
            isQL: true,
            $payload: {
                token,
                body: ` 
                mensagens_suporte(usuario_id: ${usuario_id}){
                    id
                    usuario_id
                    operador{
                        name
                        id
                    }
                    mensagens_suporte{
                       id
                       mensagem
                       usuario_id
                       created_at
                       suporte_id
                   }
                }
                `
            }
        })
    }

}

export const suporte = (payload) => {
    return (dispatch, getState) => {
        dispatch({
            type: SUPORTE,
            isQL: true,
            isCall: false,
            $payload: {
                ...payload
            }
        })
    }

}

export const CREATE_SUPORTE = gql`
  mutation createSuporte(
    $usuario_id: ID!,
	$mensagem: String!,
	$suporte_id: ID,
  ) {
    create_suporte(
        usuario_id: $usuario_id,
        mensagem: $mensagem,
        suporte_id: $suporte_id
    ){
        id
        usuario_id
        operador_id
        usuario{
            name
            id
        }
        operador{
            name
            id
        }
        mensagens_suporte{
            id
            usuario_id
            mensagem
            created_at
        } 
      
    }
  }
`;

