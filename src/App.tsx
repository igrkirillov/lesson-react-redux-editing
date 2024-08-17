import './App.css'
import {Outlet, Route, Routes, useNavigate, useParams} from "react-router";
import {addWork, removeWork} from "./actions";
import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import editIcon from "./assets/edit.png"
import removeIcon from "./assets/remove.png"
import {worksSelector} from "./selectors";
import {Params} from "react-router-dom";
import {AppState, store, Work} from "./appStore";

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
    const appStore = useStore<AppState>();
    const dispatch = useDispatch();
    const onSubmit = () => {
        dispatch(addWork({id: getNextId(appStore.getState().works), name: "123", cost: 100}));
    }
  return (
      <div className="add_work">
          <input type="button" onClick={onSubmit} value="Добавить работу"/>
      </div>
  )
}

function EditWork() {
    const id = retrieveIdFromParams(useParams());
  return (
      <div className="edit_work">
        Редактировать работу {id}
      </div>
  )
}

function WorkList() {
    const works = useSelector(worksSelector) as Work[];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onRemoveWork = (work: Work) => {
        dispatch(removeWork(work));
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
