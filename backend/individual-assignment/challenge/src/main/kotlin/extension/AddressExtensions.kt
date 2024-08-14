package org.example.extension

import org.example.dtos.Address

fun Address.isValid(): Boolean {
    if(this.street == "nowhere"){
        return false
    }
    return true
}