import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { setPageNumber } from "../features/icao/icaoSlice";
import { MetaData } from "../app/models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
});

const Paginator = ({ metaData, onPageChange }: Props) => {
    const dispatch = useAppDispatch();
    //const { metaData } = useAppSelector((state) => state.icao);
    const { items } = usePagination({
        count: metaData?.totalPages,
        page: metaData?.currentPage,
        onChange: (e, page) => {
            if (page < 1 || page > metaData?.totalPages!) return;
            console.log(page);
            onPageChange(page);
            //dispatch(setPageNumber({ pageNumber: page }));
        },
    });

    return (
        <div className='box is-shadowless'>
            <nav
                className='pagination is-centered'
                role='navigation'
                aria-label='pagination'>
                <List className='pagination-list'>
                    {items.map(({ page, type, selected, ...item }, index) => {
                        let children = null;

                        if (
                            type === "start-ellipsis" ||
                            type === "end-ellipsis"
                        ) {
                            children = (
                                <span className='pagination-ellipsis'>
                                    &hellip;
                                </span>
                            );
                        } else if (type === "page") {
                            children = (
                                <a
                                    className={` pagination-link ${
                                        selected ? "is-current" : ""
                                    }`}>
                                    {page}
                                </a>
                            );
                        } else {
                            children = (
                                <a className='pagination-next'>{type}</a>
                            );
                        }

                        return (
                            <li key={index} {...item}>
                                {children}
                            </li>
                        );
                    })}
                </List>
            </nav>
        </div>
    );
};

export default Paginator;
