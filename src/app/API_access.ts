const url = "http://localhost:3001/"

export function  fetchdata(path : string, post : object | undefined =undefined){
    if(post === undefined){
        return fetch(url +path).then((x) => x.text()).then((x) => JSON.parse(x))
    } else { 

        return fetch(url +path, {method:"POST",headers:{"Content-Type":"application/json"} ,body:JSON.stringify(post)}).then((x) => x.text()).then((x) => JSON.parse(x))

    }

}
export function  find(criteria : object){
    return fetchdata("find?criteria=" + JSON.stringify(criteria));
}

export function  findAll(){
    return fetchdata("find");
}


export function   findById(id:string){
    return fetchdata("findById?id=" + id);
}

export function  findByDate(s1 : number, s2 : number){
    return fetchdata(`findDateBetween?start=${s1}&end=${s2}`);
}


export function  update(id : string,  data: object){
    return fetchdata("update", {"id":id, "data":data});
}

export function  delete_(id : string){
    return fetchdata("delete", {"id":id});
}

export function  add(data : object){
    return fetchdata("add", data);
}


export function  addMany(data : object){
    return fetchdata("addMany", data);
}