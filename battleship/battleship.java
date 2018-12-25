/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hw8;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Binyomin
 */
public class Battleship {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        //HARD CODE
//        int[][] board = new int[10][10];
//        int[] boats = {5, 4, 3, 3, 2};
//        for (int i = 0; i < boats[0]; i++) {
//            board[0][i] = boats[0];
//        }
//        for (int i = 0; i < boats[1]; i++) {
//            board[3][i] = boats[1];
//        }
//        for (int i = 0; i < boats[2]; i++) {
//            board[i][8] = boats[2];
//        }
//        for (int i = 4; i < boats[3] + 4; i++) {
//            board[i][6] = boats[3];
//        }
//
//        for (int[] showBoard : board) {
//            for (int j = 0; j < showBoard.length; j++) {
//                System.out.print(showBoard[j] + " ");
//            }
//            System.out.println();
//        }
//        System.out.println();
//        System.out.println();

        //REAL CODE
        System.out.println(fileReader());
        
        int[][] board = new int[10][10];

        //for boat locations
        int[][] aircraftCarrier = new int[5][2];
        int[][] battleship = new int[4][2];
        int[][] destroyer = new int[3][2];
        int[][] submarine = new int[3][2];
        int[][] patrolBoat = new int[2][2];

        //call placeBoats to populate board & get boat locations
        placeBoats(board, 5, aircraftCarrier);
        placeBoats(board, 4, battleship);
        placeBoats(board, 3, destroyer);
        placeBoats(board, 3, submarine);
        placeBoats(board, 2, patrolBoat);

        //would be commented out in real game
        for (int[] showBoard : board) {
            for (int j = 0; j < showBoard.length; j++) {
                System.out.print(showBoard[j] + " ");
            }
            System.out.println();
        }
        System.out.println();
        System.out.println("  0 1 2 3 4 5 6 7 8 9");
        char[][] userBoard = new char[10][10];
        for (int i = 0; i < userBoard.length; i++) {
            System.out.print(i + " ");
            for (int j = 0; j < userBoard[i].length; j++) {
                userBoard[i][j] = '~';
                System.out.print(userBoard[i][j] + " ");

            }
            System.out.println();
        }
        System.out.println();

        int[][] guesses = new int[10][10];
        int rowGuess = 0;
        int colGuess = 0;
        int[] shipSunk = {0, 0, 0, 0, 0};
        int allSunk = 0;
        int times = 0;
        Scanner guess = new Scanner(System.in);
        while (allSunk < 5 && times < 50) {
            System.out.println("Please guess a row...");
            rowGuess = guess.nextInt();
            System.out.println("Please guess a column...");
            colGuess = guess.nextInt();
            if ((rowGuess < 0 || rowGuess > 9) || (colGuess < 0 || colGuess > 9)) {
                System.out.println("Ivalid guess");
            } else {
                guesses[rowGuess][colGuess] = board[rowGuess][colGuess];
                if (board[rowGuess][colGuess] == 0) {
                    System.out.println("You Missed...");
                } else if (guesses[aircraftCarrier[0][0]][aircraftCarrier[0][1]] == 5
                        && guesses[aircraftCarrier[1][0]][aircraftCarrier[1][1]] == 5
                        && guesses[aircraftCarrier[2][0]][aircraftCarrier[2][1]] == 5
                        && guesses[aircraftCarrier[3][0]][aircraftCarrier[3][1]] == 5
                        && guesses[aircraftCarrier[4][0]][aircraftCarrier[4][1]] == 5
                        && shipSunk[0] == 0) {
                    System.out.println("You sunk my Aircraft Carrier!");
                    shipSunk[0]++;
                    allSunk++;
                } else if (guesses[battleship[0][0]][battleship[0][1]] == 4
                        && guesses[battleship[1][0]][battleship[1][1]] == 4
                        && guesses[battleship[2][0]][battleship[2][1]] == 4
                        && guesses[battleship[3][0]][battleship[3][1]] == 4
                        && shipSunk[1] == 0) {
                    System.out.println("You sunk my Battleship!");
                    shipSunk[1]++;
                    allSunk++;
                } else if (guesses[destroyer[0][0]][destroyer[0][1]] == 3
                        && guesses[destroyer[1][0]][destroyer[1][1]] == 3
                        && guesses[destroyer[2][0]][destroyer[2][1]] == 3
                        && shipSunk[2] == 0) {
                    System.out.println("You sunk my Destroyer!");
                    shipSunk[2]++;
                    allSunk++;
                } else if (guesses[submarine[0][0]][submarine[0][1]] == 3
                        && guesses[submarine[1][0]][submarine[1][1]] == 3
                        && guesses[submarine[2][0]][submarine[2][1]] == 3
                        && shipSunk[3] == 0) {
                    System.out.println("You sunk my Submarine!");
                    shipSunk[3]++;
                    allSunk++;
                } else if (guesses[patrolBoat[0][0]][patrolBoat[0][1]] == 2
                        && guesses[patrolBoat[1][0]][patrolBoat[1][1]] == 2
                        && shipSunk[4] == 0) {
                    System.out.println("You sunk my Patrol Boat!");
                    shipSunk[4]++;
                    allSunk++;
                } else {
                    System.out.println("You HIT!");
                }
                times++;
            }

        }
        if (allSunk == 5) {
            System.out.println("All ships sunk! YOU WON!");
            fileWriter("You won with " + times + " tries.");
        } else {
            System.out.println("Too many tries. Game over.");
        }

    }

    public static void placeBoats(int[][] board, int ship, int[][] shipLocation) {
        int orientation = (int) (Math.random() * 2);
        if (orientation == 0) {
            int row;
            int col;
            while (true) {
                row = (int) (Math.random() * 10);
                col = (int) (Math.random() * (10 - (ship - 1)));
                //test for no overlap
                int spaces = 0;
                int colTemp = col;
                for (int i = 0; i < ship; i++) {
                    spaces += board[row][colTemp++];
                }
                if (spaces == 0) {
                    break;
                }
            }
            for (int i = 0; i < ship; i++) {
                board[row][col] = ship;
                shipLocation[i][0] = row;
                shipLocation[i][1] = col;
                col++;
            }
        } else {
            int row;
            int col;
            while (true) {
                row = (int) (Math.random() * (10 - (ship - 1)));
                col = (int) (Math.random() * 10);
                //test for no overlap
                int spaces = 0;
                int rowTemp = row;
                for (int i = 0; i < ship; i++) {
                    spaces += board[rowTemp++][col];
                }
                if (spaces == 0) {
                    break;
                }
            }
            for (int i = 0; i < ship; i++) {
                board[row][col] = ship;
                shipLocation[i][0] = row;
                shipLocation[i][1] = col;
                row++;
            }
        }
    }

    public static void fileWriter(String content) {
        //String content = "You won with " + times + " tries.\r\n";
        File f = new File("C:\\Users\\Shalom\\Documents\\NetBeansProjects\\Homework\\HW8\\src\\hw8\\BattleshipTries.txt");
        if (!f.exists()) {
            try {
                f.createNewFile();
            } catch (IOException ex) {
            }
        }
        try (FileWriter fos = new FileWriter(f, true)) {
            fos.write(content);
            //fos.flush();

        } catch (FileNotFoundException ex) {
        } catch (IOException ex) {
        }

    }

    public static StringBuilder fileReader() {
        File f = new File("C:\\Users\\Shalom\\Documents\\NetBeansProjects\\Homework\\HW8\\src\\hw8\\BattleshipTries.txt");
        StringBuilder sb = null;
        try (FileReader fis = new FileReader(f)) {
            sb = new StringBuilder();
            int i = -1;
            while ((i = fis.read()) != -1) {
                sb.append((char) i);
            }

        } catch (FileNotFoundException ex) {
        } catch (IOException ex) {
        }
        return sb;
    }
}
