import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const fetchData = async () => {

    const response = await fetch('http://localhost:8080/posts');
    const data = await response.json();

    setPosts(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          text: text,
        }),
      });
      await res.json();
      if (res.status === 200) {
        setName("");
        setText("");
        fetchData();
      } else {
        console.log("Error occured!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col"></div>
            <div className="col">
              <h1>The worst blog post site you have ever used.</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Enter your name"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="post">Post</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    id="text"
                    placeholder="Write your post here..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-light">Submit</button>
              </form>
            </div>
            <div className="col"></div>
          </div>

          <div className="row ">
            <table className="table table-sm table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Published</th>
                </tr>
              </thead>
              <tbody>
                {
                  posts.map((post, key) =>
                    <tr key={key}>
                      <th scope="row">{key + 1}</th>
                      <td>{post.name}</td>
                      <td>{post.text}</td>
                      <td>{new Date(post.createdAt).toDateString()}</td>

                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>

        </div>
      </header>
    </div>
  );
}



export default App;
