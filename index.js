const express = require("express");
const app = express();

const mps=[
    {name:"Abdul-Aziz Ayaba", age:35, hometown:"Sang", party:"NPP", constituency:"MION", religion:"Islam"},
    {name:"Rashid Pelpuo", age:57, hometown:"Wa", party:"NDC", constituency:"Wa Central", religion:"Islam"},
    {name:"Abdul-Razak Tahidu", age:44, hometown:"Cheriponi", party:"NPP", constituency:"Cheriponi", religion:"Islam"},
    {name:"Abdul-Salam Adams", age:36, hometown:"New Edubiase", party:"NDC", constituency:"New Edubiase", religion:"Islam"},
    {name:"Abed-Nego Bandim", age:44, hometown:"Nakpanduri", party:"NDC", constituency:"Bunkpurugu", religion:"Christian"},
    {name:"Abeiku Crentsil", age:48, hometown:"Ekumfi", party:"NDC", constituency:"Ekumfi", religion:"Christian"},
    {name:"Abena Osei-Asare", age:42, hometown:"Anyinam", party:"NPP", constituency:"Atiwa East", religion:"Christian"},
    {name:"Abla Dzifa Gomashie", age:56, hometown:"Aflao", party:"NDC", constituency:"Ketu south", religion:"Christian"},
    {name:"Abukari Dawuni", age:44, hometown:"Wulensi", party:"NDC", constituency:"Wulensi", religion:"Islam"},
];

app.get("/", (req, res) => res.send("this is my mps api"))
app.get("/api/mps", (req, res) => {
    res.json(mps);
});
app.get("/api/mps/:constituency", (req, res) => {
    const constituency = req.params.constituency;
    const mp = mps.some((m) => m.constituency);
    if (mp) {
        res.json(mps.filter((mp) => mp.constituency===constituency));
    } else {
        res.status(404).json({message:"not available"});
    }
});

app.delete("/api/mp/:constituency", (req,res) => {
    const constituency = req.params.constituency;
    const mp = mps.some((m) => m.constituency);
    if (mp) {
        res.json({
            msg:`MP's details deleted ${constituency}`,
            mps: mps.filter((m) => m.constituency),
        });
    }
});

app.post("/restapi/mps", (req, res) => {
    const newMp = {
        name:req.body.name,
        age:req.body.age,
        hometown:req.body.hometown,
        party:req.body.party,
        co:req.body.co,
        religion:req.body.religion
    };
    mps.push(newMp);
    res.json(mps);
});

app.put("/api/mps/:constituency", (req, res) => {
    const con = req.params.con;
    const mp = mps.some((m) => m.con===con);
    const newName=req.body.name;
    const newAge=req.body.age;
    const newHometown=req.body.hometown;
    const newParty=req.body.party;
    const newConstituency=req.body.constituency;
    const newReligion=req.body.religion
    if (mp) {
        mps.forEach((m) => {
            if (m.constituency===constituency) {
                (m.name=newName?newName:m.name)
                (m.age=newAge?newAge:m.age)
                (m.hometown=newHometown?newHometown:m.hometown)
                (m.party=newParty?newParty:m.party)
                (m.constituency=newConstituency?newConstituency:m.constituency)
                (m.religion=newReligion?newReligion:m.religion)
            };
        });
        res.json(mps)
    } else {
        res.status(404).json({message:"not available"});
    }
});

const port = 4000 //process.env.PORT ;
app.listen(port, () => console.log(`server is running on ${port}`));