import React, {useEffect, useState} from 'react';
import s from './PacksList.module.css'
import {PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {addNewPackThunk, deleteCardsPackThunk, getCardsPackThunk, updateCardsPackThunk} from "../bll/packsListReducer";
import {Packs} from "./Packs/Packs";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {EditModal} from "../../f2-profile/ui/EditModal/EditModal";
import {DeleteModal} from './ModalWindows/DeleteModal/DeleteModal';

export const PacksList = () => {

    const dispatch = useAppDispatch();
    const [value, setValue] = useState([0, 10]);
    const packData = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
    const isLoading = useAppSelector<boolean>(store => store.packsList.isLoading);
    const userNameStore = useAppSelector<string>(store => store.profile.user.name);
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [activeEditModal, setActiveEditModal] = useState(false);
    const [activeDeleteModal, setActiveDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getCardsPackThunk());
    }, [dispatch]);

    const AddCardsPackHandler = () => {
        dispatch(addNewPackThunk());
    }

    const onFocusHandler = () => {
        name ? setName(name) : setName("userNameStore")
    }
    //ф-ия изменения имени колоды и закрытия окна
    const changeName = () => {
        dispatch(updateCardsPackThunk(id, name))
        setActiveEditModal(false);
    }
    //ф-ия вызова модального окна при изменении имени колоды
    const editHandler = (id: string, name: string) => {
        setActiveEditModal(true);
        setName(name);
        setId(id);
    }
    //ф-ия вызова модального окна при удалении колоды
    const deletePackCardsHandler = (id: string, name: string) => {
        setActiveDeleteModal(true);
        setId(id);
        setName(name);
    }
    //ф-ия удаления колоды и закрытия окна
    const deletePack = () => {
        dispatch(deleteCardsPackThunk(id))
        setActiveDeleteModal(false);
    }

    if (!userNameStore) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    return (<>
            <div className={s.mainBlock}>
                <section className={s.settingsSide}>
                    <h2>Show packs cards</h2>
                    <div className={s.userChooseButton}>
                        <span className={s.active}>MY</span>
                        <span className={s.inactive}>ALL</span>
                    </div>
                    <h4 style={{margin: "20px"}}>Number of cards</h4>
                    <DoubleRange min={0} max={20} valueArr={value} setValueArr={setValue}/>
                </section>
                <section className={s.packList}>
                    <h1>PacksList</h1>
                    <InputText placeholder={"Search..."}/>
                    <Button onClick={AddCardsPackHandler}>Add new pack</Button>
                    <div className={s.cardsPackTable}>
                        <div className={s.tableHeader}>
                            <div style={{width: "20%"}}>Name</div>
                            <div style={{width: "12%"}}>Cards</div>
                            <div style={{width: "20%"}}>Last Updated</div>
                            <div style={{width: "18%"}}>Created by</div>
                            <div style={{width: "30%"}}>Actions</div>
                        </div>
                        {isLoading ? <MiniSpinner customSizeStyle={s.spinnerSize}/> : packData.map(el => {
                            return (
                                <div key={el._id} className={s.tableString}>
                                    <Packs dataPack={el}
                                           editHandler={() => editHandler(el._id, el.name)}
                                           deletePackCardsHandler={() => deletePackCardsHandler(el._id, el.name)}/>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
            <EditModal active={activeEditModal}
                       setActive={setActiveEditModal}
                       name={name}
                       inputValue={name}
                       setInputValue={setName}
                       inputFocus={onFocusHandler}
                       changeName={changeName}
            />
            <DeleteModal active={activeDeleteModal}
                         setActive={setActiveDeleteModal}
                         name={name}
                         deletePack={deletePack}
            />
        </>
    );
};
