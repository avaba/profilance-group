import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import network from "../../../api/network";
import "./AddNewsForm.scss"

interface IDataForm {
    title: string,
    description: string,
    date: string,
    approve: boolean,
}

const schema = yup.object({
    title: yup.string().max(50, "Максимум 50 символов!").required("Заполните заголовок!"),
    description: yup.string().max(300).required("Заполните описание!"),
}).required();

const AddNewsForm = () => {
    const {register, handleSubmit, reset, setValue, formState: {isValid, errors}} = useForm<IDataForm>({
        mode: 'onChange',
        defaultValues: {
          approve: false,
          date: new Date().toLocaleDateString()
        },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IDataForm> = dataForm => {
        network.post("/news", dataForm).then(res => {
            reset()
            alert("Новость успешно добавлена")
        })
    }

    return (
        <form className="add-news" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Заголовок"
                maxLength={50}
                {...register("title")}
            />
            {!!errors.title?.message && <p className="add-news__error">{errors.title?.message}</p>}

            <textarea
                placeholder="Описание"
                maxLength={300}
                {...register("description")}
            />
            {!!errors.description?.message && <p className="add-news__error">{errors.description?.message}</p>}
            <button className="btn" type={"submit"}>Опубликовать</button>
        </form>
    );
};

export default AddNewsForm;