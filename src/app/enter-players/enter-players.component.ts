import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterWrestlerDetailsComponent } from '../enter-wrestler-details/enter-wrestler-details.component';
import { MatchDetailsComponent } from '../match-details/match-details.component';

@Component({
  selector: 'app-enter-players',
  templateUrl: './enter-players.component.html',
  styleUrls: ['./enter-players.component.scss']
})
export class EnterPlayersComponent {
  constructor( public dialog: MatDialog){}
  winner:any;
  phasearr:any=[]
  images=["assets/lara.png","assets/john1.png","assets/rock.png","assets/WWE-PNG-Free-Download.png","/assets/charlotte-flair.png"]
  playersData:any= [
  // {
  //     name: 'Wrestler A',
  //     health: 100,
  //     image:"./../assets/lara.png",
  //     moves: [
  //       { name: 'Move A', damage: 45, type: 'signature' },
  //       { name: 'Move B', damage: 20, type: 'signature' },
  //       { name: 'Finishing Move', damage: 100, type: 'finisher' },
  //     ],
     
  //   },
  //   {
  //     name: 'Wrestler B',
  //     health: 110,
  //     image:"./../assets/john1.png",
  //     moves: [
  //       { name: 'Move X', damage: 35, type: 'signature' },
  //       { name: 'Move Y', damage: 25, type: 'signature' },
  //       { name: 'Ultimate Slam', damage: 95, type: 'finisher' },
  //     ],
  //   },
  //   {
  //     name: 'Wrestler C',
  //     health: 90,
  //     image:"./../assets/rock.png",
  //     moves: [
  //       { name: 'Power Punch', damage: 40, type: 'signature' },
  //       { name: 'Quick Kick', damage: 15, type: 'signature' },
  //       { name: 'Thunder Strike', damage: 110, type: 'finisher' },
  //     ],
  //   },
  //   {
  //     name: 'Wrestler D',
  //     health: 90,
  //     image:"./../assets/WWE-PNG-Free-Download.png",
  //     moves: [
  //       { name: 'Power Punch', damage: 40, type: 'signature' },
  //       { name: 'Quick Kick', damage: 15, type: 'signature' },
  //       { name: 'Thunder Strike', damage: 110, type: 'finisher' },
  //     ],
  //   },
    // {
    //   name: 'Wrestler E',
    //   health: 90,
    //   image:"./../assets/charlotte-flair.png",
    //   moves: [
    //     { name: 'Power Punch', damage: 40, type: 'signature' },
    //     { name: 'Quick Kick', damage: 15, type: 'signature' },
    //     { name: 'Thunder Strike', damage: 110, type: 'finisher' },
    //   ],
    // },
   
  ];
  openDialog(): void {
    const dialogRef = this.dialog.open(EnterWrestlerDetailsComponent, {
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result && result.type=='confirm'){
        const playerDataWithImage = {
          ...result.data,
          image: this.images[this.playersData.length % this.images.length],
        };
        this.playersData.push(playerDataWithImage)
      }
      
      console.log('The dialog was closed');
      console.log(this.playersData)
    });

  }

  startPlay() {
   this.winner = {}

    let currentRoundWrestlers =structuredClone(this.playersData);
    console.log("Current",currentRoundWrestlers)
    console.log("main",this.playersData)
    let roundNumber = 1;
    this.phasearr = []
    while (currentRoundWrestlers.length > 1) {
      console.log(`Phase ${roundNumber}:`);
     const  temp =[]
      const winners = [];
  
      while (currentRoundWrestlers.length > 1) {
        const randomIndexA = Math.floor(Math.random() * currentRoundWrestlers.length);
        const wrestlerA = currentRoundWrestlers.splice(randomIndexA, 1)[0];
  
        const randomIndexB = Math.floor(Math.random() * currentRoundWrestlers.length);
        const wrestlerB = currentRoundWrestlers.splice(randomIndexB, 1)[0];
  
        const match =this.runMatch(wrestlerA, wrestlerB);

        temp.push(match)
        winners.push(wrestlerA.health > 0 ? wrestlerA : wrestlerB);
      }
  
      if (currentRoundWrestlers.length === 1) {
        winners.push(currentRoundWrestlers[0]);
        console.log(`${currentRoundWrestlers[0].name} receives a bye.`);
        temp.push({"match":[`${currentRoundWrestlers[0].name} receives a bye.`],"player1":currentRoundWrestlers[0],"player2":null,"winner":currentRoundWrestlers[0],"pass":true})
      }
      this.phasearr.push(temp)
      currentRoundWrestlers = winners;
      roundNumber++;

    }
  
    const ultimateWinner = currentRoundWrestlers[0];
    if (this.playersData.length === 1) {
      console.log(`${currentRoundWrestlers[0].name} receives a bye.`);
      this.phasearr.push([{"match":[`${currentRoundWrestlers[0].name} receives a bye.`],"player1":currentRoundWrestlers[0],"player2":null,"winner":currentRoundWrestlers[0],"pass":true}])
    }
    console.log(`The ultimate winner is ${ultimateWinner.name}!`);
    this.winner = ultimateWinner
    console.log("Final,",this.phasearr)

  }
  
  

  runMatch(wrestlerA:any, wrestlerB:any){
    console.log(`Match: ${wrestlerA.name} vs. ${wrestlerB.name}`);
    
    let round = 1;
    var fullmatcharr:any = {"match":[],"player1":wrestlerA,"player2":wrestlerB,"winner":{}};
    fullmatcharr.match.push(`Match: ${wrestlerA.name} vs. ${wrestlerB.name}`)
    while (wrestlerA.health > 0 && wrestlerB.health > 0) {
      fullmatcharr.match.push(`Before round ${wrestlerA.name}'s health: ${wrestlerA.health}.`)
      fullmatcharr.match.push(`Before round ${wrestlerB.name}'s health: ${wrestlerB.health}.`)
      console.log(`Round ${round}:`);
      fullmatcharr.match.push(`Round ${round}:`)
      const player1moves = this.performMove(wrestlerA, wrestlerB);

      fullmatcharr.match.push(...player1moves)
      if (wrestlerB.health <= 0) {
        fullmatcharr.match.push(`${wrestlerB.name}'s health is below 0. ${wrestlerA.name} wins!`)
        fullmatcharr.winner = wrestlerA
        console.log(`${wrestlerB.name}'s health is below 0. ${wrestlerA.name} wins!`);
        break;
      }
  
      
      const player2moves =this.performMove(wrestlerB, wrestlerA);
   
      fullmatcharr.match.push(...player2moves)
      if (wrestlerA.health <= 0) {
        fullmatcharr.match.push(`${wrestlerA.name}'s health is below 0. ${wrestlerB.name} wins!`)
        fullmatcharr.winner = wrestlerB
        console.log(`${wrestlerA.name}'s health is below 0. ${wrestlerB.name} wins!`);
        break;
      }
  
      round++;
    }
    console.log(fullmatcharr)
    return fullmatcharr
  }

  performMove(attacker:any, defender:any) {
    const randomMoveIndex = Math.floor(Math.random() * attacker.moves.length);
    const move = attacker.moves[randomMoveIndex];
    const movearr=[]
    
    console.log(`${attacker.name} performs ${move.name} which has damage ${move.damage} on ${defender.name}.`);
    movearr.push(`${attacker.name} performs ${move.name} which has damage ${move.damage} on ${defender.name}.`)
    if (move.type === 'finisher' && defender.health > 45 && Math.random() > 0.5) {
    console.log(`But the ${move.name} fails!`);
    movearr.push(`But the ${move.name} fails!`)
    } else {
    defender.health -= move.damage;
    }

    console.log(`${defender.name}'s health: ${defender.health}.`);
    console.log(`${attacker.name}'s health: ${attacker.health}.`);
    movearr.push(`${defender.name}'s health: ${defender.health}.`)
    movearr.push(`${attacker.name}'s health: ${attacker.health}.`)
    return movearr
}
checkMatchDetails(matchDetails:any){
  console.log(matchDetails)
  const dialogRef = this.dialog.open(MatchDetailsComponent, {
    data: {match:matchDetails},
   
  });
}
  
}
