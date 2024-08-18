import './App.css'
import {Outlet, Route, Routes, useNavigate, useParams} from "react-router";
import {addWork, editWork, removeWork} from "./actions";
import {Provider, useDispatch, useSelector} from "react-redux";
import editIcon from "./assets/edit.png"
import removeIcon from "./assets/remove.png"
import {worksSelector} from "./selectors";
import {Params} from "react-router-dom";
import {store, Work} from "./appStore";
import {FormEvent, useEffect, useRef} from "react";

function App() {
  return (
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route path="/" element={<AddWork></AddWork>}></Route>
              <Route path="/edit/:id" element={<EditWork></EditWork>}></Route>
            </Route>
          </Routes>
      </Provider>
  )
}

export function Layout() {
  return (
      <div className="layout">
        <Outlet></Outlet>
        <WorkList></WorkList>
      </div>
  )
}

function AddWork() {
    const works = useSelector(worksSelector) as Work[];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = (form[0] as HTMLInputElement).value;
        const cost = (form[1] as HTMLInputElement).valueAsNumber;
        dispatch(addWork({id: getNextId(works), name: name, cost: cost}))
        form.reset();
        navigate("/");
    }
    const nameRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        nameRef.current?.focus();
    });
    return (
        <form className="form-add-edit" onSubmit={onSubmit}>
            <input type="text" placeholder="Название работы" name="name" className="form-name" ref={nameRef}
                   required={true}/>
            <input type="number" placeholder="Стоимость" name="cost" className="form-cost" required={true}/>
            <input type="submit" value="Добавить работу"/>
        </form>
    )
}

function EditWork() {
    const works = useSelector(worksSelector) as Work[];
    const dispatch = useDispatch();
    const id = retrieveIdFromParams(useParams());
    const currentWork = works.filter(w => w.id === id)[0];
    const navigate = useNavigate();
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = (form[0] as HTMLInputElement).value;
        const cost = (form[1] as HTMLInputElement).valueAsNumber;
        dispatch(editWork({...currentWork, name: name, cost: cost}))
        navigate("/");
    }
    const nameRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        nameRef.current?.focus();
    });
    return (
        <form className="form-add-edit" onSubmit={onSubmit}>
            <input type="text" placeholder="Название работы" name="name" className="form-name"
                   defaultValue={currentWork.name} ref={nameRef} required={true}/>
            <input type="number" placeholder="Стоимость" name="cost" className="form-cost"
                   defaultValue={currentWork.cost} required={true}/>
            <input type="submit" value="Сохранить изменения"/>
        </form>
    )
}

function WorkList() {
    const works = useSelector(worksSelector) as Work[];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onRemoveWork = (work: Work) => {
        dispatch(removeWork(work));
        navigate("/");
    }
    const onEditWork = (work: Work) => {
        navigate(`/edit/${work.id}`)
    }
  return (
      <ul className="work_list">
          {works.map(w => (<WorkListItem work={w} onRemoveWork={onRemoveWork} onEditWork={onEditWork}></WorkListItem>))}
      </ul>
  )
}

type WorkListItemProps = {
    work: Work,
    onRemoveWork: (work: Work) => void,
    onEditWork: (work: Work) => void
}

function WorkListItem(props: WorkListItemProps) {
    const {work, onRemoveWork, onEditWork} = props;
    const onEditClick = () => {
        onEditWork(work);
    }
    const onRemoveClick = () => {
        onRemoveWork(work);
    }
    return (
        <li className="work-list-item">
            <span>{`${work.name}  ${work.cost}`}</span>
            <a href="#" onClick={onEditClick}>
                <img src={editIcon} alt="edit image" className="action-icon"></img>
            </a>
            <a href="#" onClick={onRemoveClick}>
                <img src={removeIcon} alt="remove image" className="action-icon"></img>
            </a>
        </li>
    )
}

function getNextId(works: Work[]): number {
    return works.map(w => w.id).reduce((prev, current) => Math.max(prev, current), 0) + 1;
}

function retrieveIdFromParams(params: Params<string>): number {
    const {id} = params;
    if (id && !isNaN(parseInt(id))) {
        return +id;
    } else {
        throw Error(`Не определён id: ${id}`);
    }
}

export default App
