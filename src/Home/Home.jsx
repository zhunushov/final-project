import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Delete, Person } from '@material-ui/icons';
import Search from '@material-ui/icons/Search';
import { Pagination } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import KaruselMainPage from '../component/KaruselMainPage/KaruselMainPage';
import MyNavbar from '../MapApi/MyConmponents/MyNavbar/MyNavbar';
import { hotelsContext } from '../MyContext/MyContext';

const Home = () => {
    const { addComment, getComment, comment, deleteCommnet, pagination } = useContext(hotelsContext)
    const currentUser = useAuth()
    const [searchParams, setSearchParams] = useSearchParams();
    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(
      searchParams.get("_page") ? searchParams.get("_page") : 1
    );
    const [searchVal, setSearchVal] = useState(searchParams.get("q") ? searchParams.get("q") : "");
// !pagi
    useEffect(() => {
        getComment();
      }, [getComment]);
      useEffect(() => {
        setSearchParams({
          _limit: limit,
          _page: page,
        });
      }, [limit, page]);

      const handlePage = (e, pageVal) => {
        setSearchParams({ _page: pageVal, _limit: limit });
        getComment();
        setPage(pageVal);
      };
//  ! SEarch
    useEffect(() => {
    setSearchParams({
      q: searchVal,
      _limit: 3,
      _page: 0,
    });
  }, [searchVal]);

  const handleValue = (e) => {
    const search = new URLSearchParams(window.location.search);
    search.set("q", e.target.value);
    setSearchParams({
      q: searchVal,
      _limit: 3,
      _page: 0,
    });
    setSearchVal(e.target.value);
    getComment();
  };

    //! ADDD
    useEffect(() => {
        getComment()
    }, [])
    const [ values , setValues] = useState({
        comment: "",
    })
    const handleInp = (event) => {
        let obj = {
          ...values,
          [event.target.name]: event.target.value
        }
        setValues(obj)
    }
    const handleSubmit = () => {
        addComment(values) 
        setValues("")
    }

    return (
        <div>
            <MyNavbar />
            <KaruselMainPage />
            <div style={{maxWidth: '80%', marginBottom: "20px", alignItems: "center" , margin: "0 auto 10px", borderRadius: "20px"}}>
            <video src="https://player.vimeo.com/external/403833760.hd.mp4?s=858ec73b31100e92d0f39272e920051c1d3ce406&profile_id=172&oauth2_token_id=57447761" autoPlay loop muted style={{width: "100%", borderRadius: "20px"}} gutterbottom ></video>
            <div>

             <form component='form' noValidate   onSubmit={handleSubmit}>
            <TextField
            style={{marginBottom: "15px", marginTop: "10px"}}
            placeholder="Commnets...."
            name="comment"
            value={values.comment} 
            onChange={handleInp}
             fullWidth
             InputProps={{
              endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                  <Button type='submit'>
                      Отправить....
                  </Button>
              </IconButton>
            </InputAdornment>
             ),}}
              variant="standard"/>
            </form>
            {
                comment?.length > 0 ? (
                    <>
                    <TextField
                    placeholder="Поиск"
                     fullWidth
                     value={searchVal}
                     onChange={e => setSearchVal(e.target.value)}
                      InputProps={{
                      endAdornment: (
                       <InputAdornment position="end">
                        <IconButton>
                          <Search fontSize="large" />
                        </IconButton>
                        </InputAdornment>
                       )}}variant="standard"/>
                    </>
                ): null
            }
            
            </div>
            <div>
                {
                    comment ? comment.map((item) => (
                    <div style={{backgroundColor: "#DFE69D", borderRadius: "15%"}} >
                    <div style={{textAlign: 'center'}}> <span style={{marginLeft: "30%"}}>{item.comment}  <span style={{color: "red",}}> { currentUser?.email} </span>   </span><IconButton onClick={() => deleteCommnet(item.id)} style={{marginLeft: "30%"}}> <Delete /> </IconButton>  </div>
                     
                    </div>
                    )): <h1>loading ..</h1>
                }
            <div style={{alignItems: 'center', justifyContent: "center", textAlign: 'center', display: "grid"}}>
                     <Pagination count={pagination} onChange={handlePage} page={+page} />
            </div>
            </div>
            </div>
        </div>
    );  
};

export default Home;