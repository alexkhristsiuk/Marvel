import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from "prop-types";
import Spinner from '../spinner/Spiner';
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(213);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
/*          window.addEventListener('scroll',() => charListLoadedByScroll(offset))
         return window.removeEventListener('scroll',() => charListLoadedByScroll(offset)); */
    }, [])
       

// Loading character by scroll

/*     const charListLoadedByScroll = (offset) => {
        if (newItemLoading) return;
        if (charEnded) {
            window.removeEventListener('scroll',() => charListLoadedByScroll(offset));
        }
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = height - screenHeight / 4;
        const position = scrolled + screenHeight

        if (position >= threshold) {
            onRequest(offset);
        }
	} */

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemsRefs = useRef([]);
    
    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    }

    function renderListItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                imgStyle = {'objectFit': 'fill'};
            }

            return (
                <li className="char__item" 
                    key={item.id}
                    tabIndex={0}
                    ref={el => itemsRefs.current[i] = el} 
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        }}
                    onKeyUp={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i)
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                  {items}  
            </ul>
        )
    }

    const items = renderListItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
