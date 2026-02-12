export interface item {
  id: number;
  nama: string;
  penulis: string;
  rilis: string;
  stock: number;
}

export let items: item[] = [
    {id:1 , nama:"Shingeki no Kyojin" , penulis:"Hajime Isayama", rilis:"9 September 2009" ,stock:20},
    {id:2, nama:"Re:Zero" , penulis:"Tappei Nagatsuki" , rilis:"25 Januari 2014" ,stock:30},
    {id:3 , nama:"Oshi No Ko" , penulis:"Aka Akasaka" , rilis:"23 April 2020" ,stock:18},
    {id:4 , nama:"Undead + Unlock" , penulis:"Yoshifumi Tozuka" , rilis:"20 Januari 2020" ,stock:12},
    {id:5 , nama:"Dr.Stone" , penulis:"Riichiro Inagaki" , rilis:"6 Maret 2017" ,stock:17},
]