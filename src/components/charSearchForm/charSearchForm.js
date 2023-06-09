import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charSearchForm.scss';

const CharSearchForm = () => {
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharacterLoaded = (character) => {
        setCharacter(character)
    }

    const showCharacter = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharacterLoaded)
    }

    const errorMessage = error ? <div className='char__search-critical-error'><ErrorMessage/></div> : null;
    const results = !character ? null : character.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit ${character[0].name} page?</div>
                        <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                            .required('This field is required'),
                })}
                onSubmit = { ({charName}) => {
                    showCharacter(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className='char__search-wrapper'>
                        <Field 
                            id="charName"
                            name="charName" 
                            placeholder='Enter name'
                            type="text"
                        />
                        <button 
                            className="button button__main"
                            type="submit"
                            disabled={loading}
                        >
                            <div className='inner'>Find</div>
                        </button>
                    </div> 
                    <FormikErrorMessage className="char__search-error" name="charName" component={"div"}/>   
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;