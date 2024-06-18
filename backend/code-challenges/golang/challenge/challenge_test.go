package challenge_test

import (
	"challenge/challenge"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSumExample(t *testing.T) {
	tests := []struct {
		a, b, want int
	}{
		{1, 2, 3},
		{5, 5, 10},
		{10, 0, 10},
		{0, 0, 0},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("Sum %d + %d", tt.a, tt.b)
		t.Run(testname, func(t *testing.T) {
			got := challenge.Sum(tt.a, tt.b)
			assert.Equal(t, got, tt.want)
		})
	}
}
